
import { EditorStatus, EditorError, Form } from "./types";

export type EditorAction =
  | { type: 'askConfirmation', action: any } // TODO
  | { type: 'setStatus', status: EditorStatus} // TODO
  | { type: 'setErrors', append?: boolean, errors: EditorError[]} // TODO
  | { type: 'setVersions', versions: any } // TODO
  
  | { type: 'setForm', formData: Form}
  | { type: 'setTag', tagName: string}
  
  | { type: 'loadForm' }
  | { type: 'setActiveItem', itemId: string }
  | { type: 'setActivePage', itemId: string }
  | { type: 'deleteItem', itemId: string }
  | { type: 'setActiveLang', language: string }
  | { type: 'cancelConfirmation'} 
  | { type: 'showItemOptions', options: { itemId: string, isPage: boolean}}
  | { type: 'hideItemOptions' }
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
  | { type: 'showNewTag' }
  | { type: 'hideNewTag' }
  | { type: 'performChangeId', id: {old: string, new: string} }
  | { type: 'setTreeCollapse', collapsed: boolean, itemId: string }
  ;