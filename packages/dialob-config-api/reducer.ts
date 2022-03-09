import produce from 'immer';
import { ConfigAction } from './actions';
import { ConfigState } from './types';

const actions = (mutable: ConfigState, action: ConfigAction): void => {
  if (action.type === 'setConfig') {
    mutable.config = action.config;
  } else {
    console.error("Config reducer, unknown action", action);
  }
}

export const configReducer = (state: ConfigState, action: ConfigAction): ConfigState => produce(state, mutable => actions(mutable, action));

