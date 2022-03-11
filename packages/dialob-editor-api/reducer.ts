import produce from 'immer';
import { EditorAction } from './actions';
import { EditorState, Editor } from './types';
import { FormItem, FormValidationError } from '../dialob-config-api'

function setErrors(state: Editor, errors: FormValidationError[], append: boolean) {

  if(append && state.errors) {
    state.errors = [...state.errors, ...errors]
  } else {
    state.errors = errors;
  }


  if (errors && errors.length > 0) {
    if (errors.findIndex(e => e.level === 'FATAL') > -1) {
      state.status = 'STATUS_FATAL';
    } else {
      if (errors.length === errors.filter(e => e.level === 'WARNING').length) {
        state.status = 'STATUS_WARNINGS';
      } else {
        state.status = 'STATUS_ERRORS';
      }
    }
  } else {
    state.status = 'STATUS_OK';
  }
}

function clearErrors(state: Editor, prefix: string) {
  if (!state.errors) {
    return
  }
  state.errors = state.errors.filter(e => prefix ? !e.message.startsWith(prefix) : false);
}

function selectActiveLanguage(state: Editor, languages: string[]) {
  const activeLanguage = state.activeLanguage;
  if (!activeLanguage) {
    return languages[0];
  } else {
    if (languages.findIndex(l => l === activeLanguage) < 0) {
      return languages[0];
    } else {
      return activeLanguage;
    }
  }
}

export function findRoot(data: Record<string, FormItem> | null) {
  if (!data) {
    return null;
  }
  const result = Object.values(data).filter(v => v.type === 'questionnaire');
  return result[0];
}


const actions = (state: Editor, action: EditorAction): void => {

  switch (action.type) {
    case 'setForm': {
      const { languages } = action.formData.metadata;
      const { data } = action.formData;

      state.changeId = undefined;
      state.activeItemId = selectActiveLanguage(state, languages);
      state.rootItemId = findRoot(data)?.id;
      state.loaded = true;
      state.contextValues = undefined;
      return;
    }
    case 'setTag': {
      state.tag = action.tagName;
      return;
    }
    case 'loadForm': {
      state.loaded = false;
      state.rootItemId = undefined;
      return;
    }
    case 'setActiveItem': {
      state.activeItemId = action.itemId;
      return;
    }
    case 'setActivePage': {
      state.activeItemId = action.itemId;
      state.activePageId = action.itemId;
      return;
    }
    case 'deleteItem': {
      if (state.activeItemId === action.itemId) {
        state.activeItemId = undefined;
      }
      if (state.activePageId === action.itemId) {
        state.activePageId = undefined;
      }
      return;
    }
    case 'setActiveLang': {
      state.activeLanguage = action.language;
      return;
    }
    case 'askConfirmation': {
      state.confirmableAction = action.action;
      return;
    }
    case 'cancelConfirmation': {
      state.confirmableAction = undefined;
      return;
    }
    case 'showItemOptions': {
      state.itemOptions = { itemId: action.options.itemId, isPage: action.options.isPage };
      return;
    }
    case 'hideItemOptions': {
      state.itemOptions = undefined;
      return;
    }
    case 'setStatus': {
      state.status = action.status;
      return;
    }
    case 'setErrors': {
      setErrors(state, action.errors, action.append ? action.append : false);
      return;
    }
    case 'showFormOptions': {
      state.formOptions = true;
      return;
    }
    case 'hideFormOptions': {
      state.formOptions = false;
      return;
    }
    case 'showVariables': {
      state.variablesDialog = true
      return;
    }
    case 'hideVariables': {
      state.variablesDialog = false;
      return;
    }
    case 'showChangeId': {
      state.changeId = action.changeId;
      return;
    }
    case 'hideChangeId': {
      state.changeId = undefined;
      return;
    }
    case 'showPreviewCtx': {
      state.previewContextDialog = true;
      return;
    }
    case 'hidePreviewCtx': {
      state.previewContextDialog = false;
      return;
    }
    case 'showValuesets': {
      state.valueSetsOpen = true;
      return;
    }
    case 'hideValuesets': {
      state.valueSetsOpen = false;
      return;
    }
    case 'showTranslation': {
      state.translationOpen = true;
      return;
    }
    case 'hideTranslation': {
      state.translationOpen = false;
      return;
    }
    case 'showVersioningDialog': {
      state.versioningDialog = true;
      return;
    }
    case 'hideVersioningDialog': {
      state.versioningDialog = false;
      state.versions = undefined;
      return;
    }
    case 'fetchVersions': {
      state.versions = undefined;
      return;
    }
    case 'setVersions': {
      state.versions = action.versions;
      return;
    }
    case 'showNewTag': {
      state.newTagDialog = true;
      return;
    }
    case 'hideNewTag': {
      clearErrors(state, 'TAG_');
      state.newTagDialog = false;
      return;
    }
    case 'performChangeId': {
      if (state.activeItemId === action.id.old) {
        state.activeItemId = action.id.new;
      }

      if (state.activePageId === action.id.old) {
        state.activePageId = action.id.new;
      }
      return;
    }
    case 'setTreeCollapse': {
      let treeCollapse = state.treeCollapse;
      if (!treeCollapse) {
        treeCollapse = [];
        state.treeCollapse = treeCollapse;
      }
      if (!action.collapsed && treeCollapse.findIndex(id => id === action.itemId) > -1) {
        treeCollapse = treeCollapse.splice(treeCollapse.findIndex(id => id === action.itemId), 1)
        
        
      } else if (action.collapsed && treeCollapse.findIndex(id => id === action.itemId) === -1) {
        treeCollapse.push(action.itemId);
      }
      return;
    }

  };
}

export const editorReducer = (state: EditorState, action: EditorAction): EditorState => produce(state, state => actions(state.state, action))
