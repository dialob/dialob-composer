import { Dialob } from '../../global';
import { useUtil } from '../util';

const getErrorLevel = (errors: Dialob.EditorError[]): Dialob.EditorStatus => {
  if (!errors || errors.length === 0) {
    return 'STATUS_OK';
  } else if (errors.length === errors.filter(e => e.level === 'WARNING').length) {
    return 'STATUS_WARNINGS';
  } else {
    return 'STATUS_ERRORS';
  }
}

const getBorderColor = (props: { active: boolean, errorLevel: Dialob.EditorStatus }) => {

  if (props.active) {
    return 'blue';
  } else if (props.errorLevel === 'STATUS_WARNINGS') {
    return 'yellow';
  } else if (props.errorLevel === 'STATUS_ERRORS') {
    return 'red';
  } else {
    return null;
  }
}

const useItem = (itemId: string) => {
  const config = Dialob.useConfig();
  const editor = Dialob.useEditor();
  const form = Dialob.useForm();
  const util = useUtil();

  const item = form.state.data[itemId];
  const errors = editor.state.errors ?
    editor.state.errors.filter(e => (e.message.startsWith('VALUESET_') && e.itemId === item.valueSetId) || e.itemId === itemId)
    : [];

  const active = item && itemId === editor.state.activeItemId,
  const errorLevel = getErrorLevel(errors);
  const borderColor = getBorderColor({ errorLevel, active });
  return {
    item, errors, errorLevel, borderColor, active,

    language: editor.state.activeLanguage,
    itemEditors: config.state.config.itemEditors,
    editable: !editor.state.tag,
    treeCollapsed: editor.state.treeCollapse && editor.state.treeCollapse.findIndex(id => id === itemId) > -1,
    rootItemId: editor.state.rootItemId,
    validations: item && item.validations,

    setActivePage: (pageId: string) => editor.setActivePage(pageId),
    newItem: (config: Dialob.DialobItem, parentItemId: string, afterItemId?: string) => util.addItem(config, parentItemId, afterItemId),
    setAttribute: (itemId: string, attribute: string, value: string, language?: string) => form.updateItem(itemId, attribute, value, language),
    changeId: (itemId: string) => editor.showChangeId(itemId),
    setTreeCollapsed: (collapsed: boolean) => editor.setTreeCollapse({ itemId, collapsed }),

    setActive: (noScroll = false) => {
      if (editor.state.itemOptions?.isPage) {
        editor.setActivePage(itemId);
      } else {
        util.setActiveItem(itemId, noScroll);
      }
    },
    createChildren: (props: {}, config: ) => {
      return item && item.items && item.items
        .map(nextId => form.state.data[nextId])
        .map(item => itemFactory(item, props, config));
    }

  }

  export { useItem }