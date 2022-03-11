import { useConfig } from '../dialob-config-api';
import { EditorStatus, useEditor } from '../dialob-editor-api';
import { useComposer as useForm, ContextVariable, DialobItem } from '../dialob-form-api';

import * as MainMenuFC from './react/main-menu/MainMenu';
import * as RuleEditorFC from './react/rule-editor/RuleEditor';
import * as ErroListFC from './react/ErrorList';
import * as TreeViewFC from './react/tree-view/TreeView';
import * as ScrollableEditorFC from './react/editor';

declare namespace Dialob {
  export type {
    EditorStatus,
    DialobItem,
    ContextVariable
  }
  
  
  export {
    useEditor, useConfig, useForm,
  }


  export const FC = {   
    MainMenu: MainMenuFC.MainMenu,
    RuleEditor: RuleEditorFC.RuleEditor,
    TreeView: TreeViewFC.TreeView,
    ErrorList: ErroListFC.ErrorList,
    ScrollableEditor: ScrollableEditorFC.ScrollableEditor,
  }
}
