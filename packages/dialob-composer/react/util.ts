import FileSaver from 'file-saver';
import { Dialob } from '../global';

function findPageForItem(formData, rootItemId, itemId) {
  const pages = formData.getIn(['data', rootItemId, 'items']);
  const containsItem = (item, itemId) => {
    if (!item.get('items')) {
      return false;
    }
    for (let childId of item.get('items')) {
      if (childId === itemId) {
        return true;
      } else {
        const childItem = formData.getIn(['data', childId]);
        if (containsItem(childItem, itemId)) {
          return true;
        }
      }
    }
    return false;
  }

  if (pages.contains(itemId)) {
    return itemId; // Active item is a page
  }

  for (let pageId of pages) {
    const page = formData.getIn(['data', pageId]);
    if (containsItem(page, itemId)) {
      return pageId;
    }
  }

  return null;
}


export const useUtil = () => {

  const config = Dialob.useConfig();
  const form = Dialob.useForm();
  const editor = Dialob.useEditor();


  const setActiveItem = (itemId: string, noScroll?: boolean) => {
    
      const pageId = findPageForItem(store.getState().dialobComposer.form, store.getState().dialobComposer.editor.get('rootItemId'), action.itemId);
      editor.setActivePage(pageId);
  }

  
  const addItem = (itemTemplate: Dialob.DialobItem, parentItemId: string, afterItemId ?: string) => {
    form.addItem(itemTemplate, parentItemId, afterItemId);
    
    if (config.state.postAddItem) {
      config.postAddItem(store.dispatch, action, store.getState().dialobComposer.form.getIn(['metadata', 'composer', 'transient', 'lastItem']));
    }    
    store.getState().dialobComposer.form.getIn(['metadata', 'composer', 'transient', 'lastItem'])
    
  }

  const copyItem = (itemId: string) => {
    formService.duplicateItem(store.getState().dialobComposer.form.toJS(), action.itemId)
      .then(json => {
        store.dispatch(setFormRevision(json.rev));
        store.dispatch(setErrors(json.errors));
        if (json.form) {
          store.dispatch(setForm(json.form));
          store.dispatch(saveForm());
        }
      })
      .catch(error => store.dispatch(setErrors([{ severity: 'FATAL', message: error.message }])));
  }

  const downloadForm: (tagName?: string) => void = (tagName?: string) => {
    if (tagName) {
      const formName = form.state.name;
      config.state.service.loadForm(formName, tagName).then(json => {
        const text = JSON.stringify(json, null, 2);
        const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
        FileSaver.saveAs(blob, `${formName}-${tagName}.json`);
      })

    } else {
      const json = JSON.stringify(form.state, null, 2);
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      FileSaver.saveAs(blob, `${form.state._id}.json`);
    }
  }

  const requestPreview = () => {
    const { variables } = form.state;
    if (variables && variables.findIndex(v => (v as Dialob.ContextVariable).context === true) > -1) {
      return editor.showPreviewCtx()
    } else {
      let language = editor.state.activeLanguage;
      let context: { id: string, value?: string }[] | undefined = undefined;
      if (editor.state.contextValues) {
        context = Object.entries(editor.state.contextValues).map(e => ({ id: e[0], value: e[1] }));
      }
      config.state.service.createSession(form.state._id, language, context)
        .then(json => {
          redirectPreview(json._id);
        })
        .catch(error => editor.setErrors({ errors: [{ severity: 'FATAL', message: error.message }] }));
    }
  }

  const redirectPreview = (sessionId: string) => {
    let previewUrl = config.state.config.transport.previewUrl;
    let win = window.open(`${previewUrl}/${sessionId}`);
    if (win) {
      win.focus();
    } else {
      editor.setErrors({ errors: [{ severity: 'FATAL', message: 'FATAL_POPUP' }] });
    }
    editor.hidePreviewCtx();
  }

  return { downloadForm, requestPreview, redirectPreview, copyItem, addItem, setActiveItem };
}



