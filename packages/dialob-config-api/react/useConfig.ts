import { useContext } from "react"
import { ConfigContext } from './ConfigContext';
import { Config } from "../types";

export const useConfig = () => {
  const { state, dispatch } = useContext(ConfigContext);
  const setConfig = (config: Config): void => dispatch({type: 'setConfig', config});
  
  
  const getLanguageName = (code: string) => {
    return state.defaults.languages.find(lang => lang.code === code)?.name;
  }
  
  return { state, setConfig, getLanguageName };
}