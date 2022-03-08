import produce from 'immer';
import { EditorAction } from './actions';
import { EditorState } from './types';


const actions = (state: EditorState, action: EditorAction): void => {

  switch (action.type) {
    case 'setForm':
      return state.delete('changeId')
        .set('activeLanguage', selectActiveLanguage(state, action.formData.metadata.languages))
        .set('rootItemId', findRoot(Immutable.fromJS(action.formData).get('data')).get('id'))
        .set('loaded', true)
    case 'loadForm':
      return state.delete('loaded').delete('rootItemId');
    case 'setActiveItem':
      return state.set('activeItemId', action.itemId);
    case 'setActivePage':
      return state.set('activeItemId', action.itemId).set('activePageId', action.itemId);
    case 'deleteItem':
      const nextState = state.get('activeItemId') === action.itemId ? state.delete('activeItemId') : state;
      return state.get('activePageId') === action.itemId ? nextState.delete('activePageId') : nextState;
    case 'setActiveLang':
      return state.set('activeLanguage', action.language);
    case 'askConfirmation':
      return state.set('confirmableAction', action.action);
    case 'cancelConfirmation':
      return state.delete('confirmableAction');
    case 'showItemOptions':
      return state.set('itemOptions', Immutable.fromJS({ itemId: action.itemId, isPage: action.isPage }));
    case 'hideItemOptions':
      return state.delete('itemOptions');
    case 'setStatus':
      return state.set('status', action.status);
    case 'setErrors':
      return setErrors(state, action.errors, action.append);
    case 'showFormOptions':
      return state.set('formOptions', true);
    case 'hideFormOptions':
      return state.delete('formOptions');
    case 'showVariables':
      return state.set('variablesDialog', true)
    case 'hideVariables':
      return state.delete('variablesDialog');
    case 'showChangeId':
      return state.set('changeId', action.changeId);
    case 'hideChangeId':
      return state.delete('changeId');
    case 'showPreviewCtx':
      return state.set('previewContextDialog', true);
    case 'hidePreviewCtx':
      return state.delete('previewContextDialog');
    case 'showValuesets':
      return state.set('valueSetsOpen', true);
    case 'hideValuesets':
      return state.delete('valueSetsOpen');
    case 'showTranslation':
      return state.set('translationOpen', true)
    case 'hideTranslation':
      return state.delete('translationOpen');
    case 'showVersioningDialog':
      return state.set('versioningDialog', true);
    case 'hideVersioningDialog':
      return state.delete('versioningDialog').delete('versions');
    case 'fetchVersions':
      return state.delete('versions');
    case 'setVersions':
      return state.set('versions', Immutable.fromJS(action.versions));
    case 'showNewTag':
      return state.set('newTagDialog', true);
    case 'hideNewTag':
      return clearErrors(state, 'TAG_').delete('newTagDialog');
    case 'performChangeId':
      const newState = state.get('activeItemId') === action.oldId ? state.set('activeItemId', action.newId) : state;
      return newState.get('activePageId') === action.oldId ? newState.set('activePageId', action.newId) : newState;
    case 'setTreeCollapse':
      return state.update('treeCollapse', treeCollapse => {
        if (!treeCollapse) {
          treeCollapse = new List();
        }
        if (!action.collapsed && treeCollapse.findIndex(id => id === action.itemId) > -1) {
          treeCollapse = treeCollapse.delete(treeCollapse.findIndex(id => id === action.itemId))
        } else if (action.collapsed && treeCollapse.findIndex(id => id === action.itemId) === -1) {
          treeCollapse = treeCollapse.push(action.itemId);
        }
        return treeCollapse;
      });


  };
}

export const editorReducer = (state: EditorState, action: EditorAction): EditorState => produce(state, state => actions(state, action))
