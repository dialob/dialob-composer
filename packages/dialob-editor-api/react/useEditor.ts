import { useContext } from "react"
import { EditorContext } from './EditorContext';
import { Form, EditorStatus, EditorError } from "../types";

export const useEditor = () => {
  const { state, dispatch } = useContext(EditorContext);

  const askConfirmation = (action: any): void => dispatch({ type: 'askConfirmation', action }) // TODO
  const setStatus = (status: EditorStatus): void => dispatch({ type: 'setStatus', status }) // TODO
  const setErrors = (props: { append?: boolean, errors: EditorError[] }): void => dispatch({ type: 'setErrors', append: props.append, errors: props.errors }) // TODO
  const setVersions = (versions: any): void => dispatch({ type: 'setVersions', versions }) // TODO

  const setForm = (formData: Form): void => dispatch({ type: 'setForm', formData })
  const setActiveItem = (itemId: string): void => dispatch({ type: 'setActiveItem', itemId })
  const setActivePage = (itemId: string): void => dispatch({ type: 'setActivePage', itemId })
  const deleteItem = (itemId: string): void => dispatch({ type: 'deleteItem', itemId })
  const setActiveLang = (language: string): void => dispatch({ type: 'setActiveLang', language })
  const showItemOptions = (options: { itemId: string, isPage: boolean }): void => dispatch({ type: 'showItemOptions', options })
  const showChangeId = (changeId: string): void => dispatch({ type: 'showChangeId', changeId })

  const performChangeId = (id: { old: string, new: string }): void => dispatch({ type: 'performChangeId', id })
  const setTreeCollapse = (props: { collapsed: boolean, itemId: string }): void => dispatch({ type: 'setTreeCollapse', collapsed: props.collapsed, itemId: props.itemId })

  const setTag = (tagName: string): void => dispatch({ type: 'setTag', tagName })

  const cancelConfirmation = (): void => dispatch({ type: 'cancelConfirmation' })
  const loadForm = (): void => dispatch({ type: 'loadForm' })
  const hideItemOptions = (): void => dispatch({ type: 'hideItemOptions' })
  const showFormOptions = (): void => dispatch({ type: 'showFormOptions' })
  const hideFormOptions = (): void => dispatch({ type: 'hideFormOptions' })
  const showVariables = (): void => dispatch({ type: 'showVariables' })
  const hideVariables = (): void => dispatch({ type: 'hideVariables' })
  const hideChangeId = (): void => dispatch({ type: 'hideChangeId' })
  const showPreviewCtx = (): void => dispatch({ type: 'showPreviewCtx' })
  const hidePreviewCtx = (): void => dispatch({ type: 'hidePreviewCtx' })
  const showValuesets = (): void => dispatch({ type: 'showValuesets' })
  const hideValuesets = (): void => dispatch({ type: 'hideValuesets' })
  const showTranslation = (): void => dispatch({ type: 'showTranslation' })
  const hideTranslation = (): void => dispatch({ type: 'hideTranslation' })
  const fetchVersions = (): void => dispatch({ type: 'fetchVersions' })
  const showNewTag = (): void => dispatch({ type: 'showNewTag' })
  const hideNewTag = (): void => dispatch({ type: 'hideNewTag' })
  const showVersioningDialog = (): void => dispatch({ type: 'showVersioningDialog' })
  const hideVersioningDialog = (): void => dispatch({ type: 'hideVersioningDialog' })

  return {
    state: state.state,
    askConfirmation,
    setStatus,
    setErrors,
    setVersions,
    setForm,
    setActiveItem,
    setActivePage,
    deleteItem,
    setActiveLang,
    showItemOptions,
    showChangeId,

    performChangeId,
    setTreeCollapse,

    setTag,
    cancelConfirmation,
    loadForm,
    hideItemOptions,
    showFormOptions,
    hideFormOptions,
    showVariables,
    hideVariables,
    hideChangeId,
    showPreviewCtx,
    hidePreviewCtx,
    showValuesets,
    hideValuesets,
    showTranslation,
    hideTranslation,
    fetchVersions,
    showNewTag,
    hideNewTag,
    showVersioningDialog,
    hideVersioningDialog
  };
}