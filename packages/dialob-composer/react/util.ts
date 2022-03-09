import FileSaver from 'file-saver';



const downloadForm: (tagName?: string) => void = (tagName?: string) => {
  if (tagName) {
    let config = store.getState().dialobComposer.config.transport;
    const formService = new FormService(config.apiUrl, config.csrf, config.tenantId);
    const formName = store.getState().dialobComposer.form.get('name');
    formService.loadForm(formName, action.tag).then(json => {
      const text = JSON.stringify(json, null, 2);
      const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
      FileSaver.saveAs(blob, `${formName}-${action.tag}.json`);
    })
  } else {
    const form = store.getState().dialobComposer.form.toJS();
    const json = JSON.stringify(form, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    FileSaver.saveAs(blob, `${form._id}.json`);
  }
}

const requestPreview = store => next => action => {
    const variables = store.getState().dialobComposer.form.get('variables');
    if (variables && variables.findIndex(v => v.get('context') === true) > -1) {
      return store.dispatch(showPreviewContext());
    } else {
      let language = store.getState().dialobComposer.editor.get('activeLanguage');
      let formId = store.getState().dialobComposer.form.get('_id');
      return store.dispatch(createPreviewSession(language));
    }
}

const redirectPreview = () => {
  let previewUrl = store.getState().dialobComposer.config.transport.previewUrl;
  let win = window.open(`${previewUrl}/${action.sessionId}`);
  if (win) {
    win.focus();
  } else {
    store.dispatch(setErrors([{ severity: 'FATAL', message: 'FATAL_POPUP' }]));
  }
  return store.dispatch(hidePreviewContext());
}



export { downloadForm, requestPreview, redirectPreview };