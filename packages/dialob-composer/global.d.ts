import * as ConfigApi from '../dialob-config-api';
import * as EditorApi from '../dialob-editor-api';
import * as FormApi from '../dialob-form-api';

import * as MainMenuRC from './react/MainMenu';

declare namespace Dialob {
  const useConfig = ConfigApi.useConfig;
  const useEditor = EditorApi.useEditor;
  const useForm = FormApi.useComposer;
  
  const RC = {    
    MainMenu: MainMenuRC.MainMenu
  }
}