import { FormValidationError, Form } from '../dialob-config-api'

export interface EditorState {
  state: Editor  
}

type EditorStatus = 'STATUS_BUSY' | 'STATUS_OK' | 'STATUS_ERRORS' | 'STATUS_FATAL' | 'STATUS_WARNINGS';


export type {
  FormValidationError, Form, EditorStatus
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

  treeCollapse?: string[];
  confirmableAction?: any; // TODO::  
  versions: any // TODO 
  status: EditorStatus, // 'STATUS_WARNINGS' | 'STATUS_ERRORS' | 'STATUS_OK' | 'STATUS_FAIL'; // TODO
  errors?: FormValidationError[] //TODO 
}


