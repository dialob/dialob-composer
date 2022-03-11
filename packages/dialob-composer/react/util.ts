import FileSaver from 'file-saver';
import { Dialob } from '../global';


export const useUtil = () => {

  const config = Dialob.useConfig();
  const form = Dialob.useForm();
  const editor = Dialob.useEditor();

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
      let context: {id: string, value?: string}[] | undefined = undefined;
      if (editor.state.contextValues) {
        context = Object.entries(editor.state.contextValues).map(e => ({ id: e[0], value: e[1] }));
      }
      config.state.service.createSession(form.state._id, language, context)
        .then(json => {
          redirectPreview(json._id);
        })
        .catch(error => editor.setErrors({errors: [{ severity: 'FATAL', message: error.message }]}));
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

  return { downloadForm, requestPreview, redirectPreview };
}



