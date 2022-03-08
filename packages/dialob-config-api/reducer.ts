import produce from 'immer';
import camelCase from 'lodash.camelcase';
import { ConfigAction } from './actions';
import { Config } from './types';

const addItem = (state: ComposerState, itemTemplate: DialobItemTemplate, parentItemId: string, afterItemId?: string, callbacks ?: ComposerCallbacks): void => {
  const id = generateItemId(state, itemTemplate);
  state.data[id] = Object.assign(itemTemplate, {id});
  // TODO: Sanity check if parentItemId exists in form
  const newIndex = state.data[parentItemId].items?.findIndex(i => i === afterItemId);
  if (newIndex === undefined) {
    state.data[parentItemId].items = [id];
  } else if (newIndex < 0) {
    state.data[parentItemId].items?.push(id);
  } else {
    state.data[parentItemId].items?.splice(newIndex + 1, 0, id);
  }

  const onAddItem = callbacks?.onAddItem;
  if (onAddItem) {
    onAddItem(state, state.data[id]);
  }
}

export const configReducer = (state: ConfigState, action: ConfigAction): ConfigState => {
  const newState = produce(state, state => {
    if (action.type === 'addItem') {
      addItem(state, action.config, action.parentItemId, action.afterItemId, callbacks);
    } else {
      console.error("Config reducer, unknown action", action);
    }
  });
  // Extension point in procude...
  return newState;
}
