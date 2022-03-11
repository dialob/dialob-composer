import { useConfig } from '../dialob-config-api';
import { EditorStatus, useEditor } from '../dialob-editor-api';
import { useComposer as useForm, ContextVariable, DialobItem } from '../dialob-form-api';

import * as MainMenuFC from './react/MainMenu';

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
    MainMenu: MainMenuFC.MainMenu
  }
}
