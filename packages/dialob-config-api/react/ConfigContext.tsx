import React, { useReducer, Dispatch } from 'react';
import { configReducer } from '../reducer';
import { ConfigAction } from '../actions';
import { Config, FormService, ConfigState } from '../types';
import FormServiceImpl from '../FormServiceImpl';
import { languages } from './languages'; 

interface ConfigContextType {
  state: ConfigState;
  service: FormService;
  dispatch: Dispatch<ConfigAction>;
}

const defaults = { languages, documentationUrl: 'https://docs.dialob.io/' };

export const ConfigContext = React.createContext<ConfigContextType>({
  state: {} as any,
  service: {} as any,
  dispatch: () => null,
});

export const ConfigProvider: React.FC<{init: Config, children: React.ReactElement}> = (props) => {
  const {init, children} = props;
  console.log("Config::context init", init);
  
  const [state, dispatch] = useReducer(configReducer, { config: Object.assign({ defaults }, init) });
  const service: FormService = React.useMemo(() => new FormServiceImpl(init), [init]);
  
  return (<ConfigContext.Provider value={{state, dispatch, service}}>{children}</ConfigContext.Provider>);

}