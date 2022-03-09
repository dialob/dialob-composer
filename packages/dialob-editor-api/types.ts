import { FormValidationError, Level, Form } from '../dialob-config-api'

export interface EditorState {
  state: Editor  
}

export type {
  Level, FormValidationError, Form
};

export interface Editor {
  loaded: boolean;
  tag: string | 'LATEST'; //active tag
  
  changeId?: string;
  rootItemId?: string;
  activeLanguage?: string;
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

  treeCollapse?: string[];
  confirmableAction?: any; // TODO::  
  versions: any // TODO 
  status?: Level, // 'STATUS_WARNINGS' | 'STATUS_ERRORS' | 'STATUS_OK' | 'STATUS_FAIL'; // TODO
  errors?: FormValidationError[] //TODO 
}


