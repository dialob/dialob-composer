import { DialobItem } from '../dialob-form-api';
export interface Csrf { token: string, headerName: string }
export type Level = 'INFO' | 'WARNING' | 'ERROR' | 'FATAL' | 'OK';
export type Type = 'VISIBILITY' | 'VALIDATION' | 'REQUIREMENT' | 'VARIABLE' | 'GENERAL' | 'CLASSNAME' | 'VALUESET' | 'VALUESET_ENTRY';


export interface ConfigState {
  config: Config
  service: FormService;
  defaults: {
    documentationUrl: string,
    languages: { code: string, name: string, flag: string }[],
    pageConfig: { type: string, view: string, id: string }
  }
}

export interface ConfigCategoryType {

  title: string,
  type: 'structure' | 'input' | 'output',
  convertible?: ('verticalSurveygroup' | 'surveygroup' | 'textBox' |
    'address' | 'text' | 'number' | 'decimal' | 'multichoice' | 'list')[]
  items: ConfigItemType[],

}

export interface ConfigItemType {

  title: string,
  optionEditors?: { name: string, editor: React.ReactElement }[],
  propEditors?: {
    columns?: {
      component: React.ReactElement,
      props: { type: 'number', min: number, max: number }
    },
    country?: {
      component: React.ReactElement,
      props: {
        allowAdditions: boolean,
        options: { key: string, label: string }[]
      }
    },
  }
  config: {
    type: 'group' | 'surveygroup' | 'rowgroup' | 'note' | 'text' | 'survey' |
    'decimal' | 'number' | 'boolean' | 'date' | 'time' | 'list' | 'multichoice';
    view?: 'verticalSurveygroup' | 'text' | 'textBox' | 'address' | 'survey' | string;
    props?: {
      columns?: number
      country?: []
    }
  }

}

export interface ConfigItemEditors {
  items: {
    matcher: (item: DialobItem, props?: {}) => boolean,
    component: React.ElementType<{itemType: string, itemId: string, parentItemId?: string}>,
    hideInTree?: boolean
    props: {
      icon: string,
      placeholder: string,
      treeCollapsible?: boolean,
    }
  }[]
}

export interface Config {
  transport: {
    csrf?: Csrf,
    apiUrl: string,
    previewUrl: string,
    tenantId: string,
  }
  itemEditors: ConfigItemEditors,
  itemTypes: { categories: ConfigCategoryType[] }
  valueSetProps: { title: string, name: string, editor: React.ReactElement }[],
  closeHandler: () => void;
};



export type FormId = string;
export type FormRev = string;

export interface Form {
  _id: FormId
  _rev: FormRev;

  name: string;
  data: Record<string, FormItem>;
  metadata: Metadata;
  variables: Variable[];
  languages: string[];
  namespaces: Record<string, Form>;
  valueSets: ValueSet[];
  requiredErrorText: Record<string, string>;
}

export interface FormUpdated {
  id: FormId;
  rev: string;
  form: Form;
  errors: FormValidationError[];
}

export interface FormItem {
  id: string;
  type: string;
  view: string;

  label: Record<string, string>;
  description: Record<string, string>;
  requiredErrorText: Record<string, string>;
  items: string[];
  validations: Validation[];
  className: string[];

  required?: string;
  readOnly?: boolean;
  activeWhen?: string;
  valueSetId?: string;
  defaultValue: any;
  props: Record<string, any>;
  additionalProperties: Record<string, any>;
}

export interface ValueSet {
  id: string;
  entries: ValueSetEntry[];
  additionalProperties: Record<string, any>;
}

export interface ValueSetEntry {
  id: string;
  label: Record<string, any>;
  when?: string;
  additionalProperties: Record<string, any>;
}

export interface Validation {
  message: Record<string, string>;
  rule: string;
}

export interface Variable {
  name: string;

  expression?: string;
  defaultValue?: string;
  context?: boolean;
  published?: boolean;
  contextType?: string;
}

export interface FormValidationError {
  itemId: string;
  message: string;
  level: Level;
  type: Type;
  expression: string;
  startIndex?: number;
  endIndex?: number;
  index?: number;
}


export interface Metadata {
  label: string;
  labels: string;
  languages: string[];
  additionalProperties: Record<string, Object>;

  created?: string;
  lastSaved?: string;
  valid?: boolean;
  creator?: string;
  tenantId?: string;
  savedBy?: string;
  defaultSubmitUrl?: string;
}

export interface Tag {
  name: string,
  description?: string,
  formName: string
  formId?: FormId
  refName?: string
  created?: string
  type: "NORMAL" | "MUTABLE"
}

export interface TagCreated {
  error: string;
  reason: string;
  ok: boolean;
}

export interface Questionnaire {
  _id: string;
  _rev: string;
  metadata: {
    formId: FormId
    formRev: 'LATEST' | string,
    language: string
  }
  context?: {};
}

export interface FormService {
  loadForm(formId: FormId, tagName?: string): Promise<Form>;
  saveForm(formData: Form, dryRun?: boolean): Promise<FormUpdated>;
  duplicateItem(formData: Form, itemId: string): Promise<FormUpdated>;
  changeItemId(formData: Form, oldId: string, newId: string): Promise<FormUpdated>;
  createSession(formId: FormId, language: string, context?: {}): Promise<Questionnaire>;
  loadVersions(formName: string): Promise<Tag[]>;
  createTag(formName: string, tagName: string, tagDescription: string, formId?: FormId): Promise<TagCreated>;
}


// Export