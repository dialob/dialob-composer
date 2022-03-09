import * as ConfigApi from '../dialob-config-api';
import * as EditorApi from '../dialob-editor-api';
import * as FormApi from '../dialob-form-api';


declare namespace Dialob {
  const useConfig = ConfigApi.useConfig;
  const useEditor = EditorApi.useEditor;
  const useForm = FormApi.useComposer;
}