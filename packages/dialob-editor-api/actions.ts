import {  } from "./types";

export type EditorAction =
  | { type: 'setForm', formId: {}}
  | { type: 'loadForm' }
  | { type: 'setActiveItem', itemId: string }
  | { type: 'setActivePage', itemId: string }
  | { type: 'deleteItem', itemId: string }
  | { type: 'setActiveLang', language: string }
  | { type: 'askConfirmation', action: any } // TODO
  | { type: 'cancelConfirmation'} 
  | { type: 'showItemOptions', options: { itemId: string, isPage: boolean}}
  | { type: 'hideItemOptions' }
  | { type: 'setStatus', status: string}
  | { type: 'setErrors', append: boolean, errors: any} // TODO
  | { type: 'showFormOptions' }
  | { type: 'hideFormOptions' }
  | { type: 'showVariables' }
  | { type: 'hideVariables' }
  | { type: 'showChangeId', changeId: string }
  | { type: 'hideChangeId' }
  | { type: 'showPreviewCtx' }
  | { type: 'hidePreviewCtx' }
  | { type: 'showValuesets' }
  | { type: 'hideValuesets' }
  | { type: 'showTranslation' }
  | { type: 'hideTranslation' }
  | { type: 'showVersioningDialog' }
  | { type: 'hideVersioningDialog' }
  | { type: 'fetchVersions' }
  | { type: 'setVersions' }
  | { type: 'showNewTag' }
  | { type: 'hideNewTag' }
  | { type: 'performChangeId', id: {old: string, new: string} }
  | { type: 'setTreeCollapse', collapsed: boolean, itemId: string }
  ;