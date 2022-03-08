import React, { useReducer, Dispatch } from 'react';
import { editorReducer } from '../reducer';
import { EditorAction } from '../actions';
import { Editor } from '../types';


interface EditorContextType {
  state: Editor;
  dispatch: Dispatch<EditorAction>;
}

export const EditorContext = React.createContext<EditorContextType>({
  state: {} as any,
  dispatch: () => null,
});

export const EditorProvider: React.FC<{children: React.ReactElement}> = (props) => {
  const {children} = props;
  console.log("Editor::context init");
  
  const [state, dispatch] = useReducer(editorReducer, init);
  
  return (<EditorContext.Provider value={{state, dispatch}}>{children}</EditorContext.Provider>);

}