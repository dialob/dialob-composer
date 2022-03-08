import { useContext } from "react"
import { ConfigContext } from './ConfigContext';
import { Config } from "../types";

export const useComposer = () => {
  const { state, dispatch } = useContext(ConfigContext);
  const setConfig = (config: Config): void => dispatch({type: 'setConfig', config});
  return { state, setConfig };
}