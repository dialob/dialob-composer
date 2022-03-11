import React, { useReducer, Dispatch } from 'react';
import { configReducer } from '../reducer';
import { ConfigAction } from '../actions';
import { Config, FormService, ConfigState } from '../types';
import FormServiceImpl from '../FormServiceImpl';
import { languages } from './languages'; 

interface ConfigContextType {
  state: ConfigState;
  dispatch: Dispatch<ConfigAction>;
}

const defaults = { 
  languages, documentationUrl: 'https://docs.dialob.io/',
  pageConfig: {
    id: 'page',
    type: 'group',
    view: 'page'
  }
};


export const ConfigContext = React.createContext<ConfigContextType>({
  state: {} as any,
  dispatch: () => null,
});
export const ConfigProvider: React.FC<{init: Config, children: React.ReactElement}> = (props) => {
  const {init, children} = props;
  console.log("Config::context init", init);
  
  const service: FormService = React.useMemo(() => new FormServiceImpl(init), [init]);  
  const [state, dispatch] = useReducer(configReducer, { service, config: init, defaults });

  
  return (<ConfigContext.Provider value={{state, dispatch}}>{children}</ConfigContext.Provider>);

}