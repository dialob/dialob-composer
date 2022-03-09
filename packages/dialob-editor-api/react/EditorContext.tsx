import React, { useReducer, Dispatch } from 'react';
import { editorReducer } from '../reducer';
import { EditorAction } from '../actions';
import { EditorState, Editor } from '../types';


interface EditorContextType {
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
}

const init: Editor = {
  versions: [],
  status: 'STATUS_OK',
  tag: 'LATEST',
  activeLanguage: 'en',
  loaded: false,
  formOptions: false,
  variablesDialog: false,
  previewContextDialog: false,
  valueSetsOpen: false,
  translationOpen: false,
  versioningDialog: false,
  newTagDialog: false,
}

export const EditorContext = React.createContext<EditorContextType>({
  state: {} as any,
  dispatch: () => null,
});

export const EditorProvider: React.FC<{children: React.ReactElement}> = (props) => {
  const { children } = props;
  console.log("Editor::context init");
  
  const [state, dispatch] = useReducer(editorReducer, { state: init });
  return (<EditorContext.Provider value={{state, dispatch}}>{children}</EditorContext.Provider>);

}