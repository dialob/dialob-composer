import { Form, FormValidationError } from '../dialob-config-api'

export interface EditorState {
  state: Editor  
}

export type EditorStatus = 'STATUS_BUSY' | 'STATUS_OK' | 'STATUS_ERRORS' | 'STATUS_FATAL' | 'STATUS_WARNINGS';
export interface EditorError extends FormValidationError {
   severity?: 'FATAL' | string, 
   message: 'FATAL_POPUP' | string
}

export type {
  Form
};

export interface Editor {
  loaded: boolean;
  tag: string | 'LATEST'; //active tag
  
  changeId?: string;
  rootItemId?: string;
  activeLanguage: string;
  activeItemId?: string;
  activePageId? : string;

  itemOptions?: {itemId: string, isPage: boolean }
  
  formOptions: boolean;
  variablesDialog: boolean;
  previewContextDialog: boolean;
  valueSetsOpen: boolean;
  translationOpen: boolean;
  versioningDialog: boolean;
  newTagDialog: boolean;

  contextValues?: Record<string, string | undefined>;
  
  treeCollapse?: string[];
  confirmableAction?: any; // TODO::  
  versions: any // TODO 
  status: EditorStatus, // 'STATUS_WARNINGS' | 'STATUS_ERRORS' | 'STATUS_OK' | 'STATUS_FAIL'; // TODO
  errors?: EditorError[] //TODO 
}


