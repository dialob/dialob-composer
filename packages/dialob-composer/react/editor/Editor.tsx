import React from 'react';
import { Menu, Input, Button, Dropdown, Label, Table, Icon } from 'semantic-ui-react';
import { itemFactory } from '../items';

import ItemTypeMenu from './ItemTypeMenu';

import { Dialob } from '../../global';
import { useUtil } from '../util';

const MAX_LENGTH = 40;

const PageMenu: React.FC<{item: Dialob.DialobItem}> = ({ item }) => {
  const editor = Dialob.useEditor();
  const util = useUtil();
  
  const onDelete = () => editor.deleteItem(item.id);
  const onOptions = () => editor.showItemOptions({itemId: item.id, isPage: true});
  const onChangeId = () => editor.showChangeId(item.id);
  const onDuplicate = () => util.copyItem(item.id);
  const editable = !editor.state.tag;

  return (
    <Dropdown icon='content' style={{ marginLeft: '0.5em' }}>
      <Dropdown.Menu>
        <Dropdown.Item icon='options' text='Options...' onClick={onOptions} />
        <Dropdown.Item disabled={!editable} icon='key' text='Change ID...' onClick={onChangeId} />
        <Dropdown.Item disabled={!editable} icon='remove' text='Delete' onClick={onDelete} />
        <Dropdown.Item disabled={!editable} icon='copy' text='Duplicate' onClick={onDuplicate} />
      </Dropdown.Menu>
    </Dropdown>);
}


const getPageTabTitle = (item: Dialob.DialobItem, language: string) => {
  const rawLabel = item.label ? item.label[language] : undefined;
  if (!rawLabel) {
    return (<em>{item.get('id')}</em>);
  } else {
    return rawLabel.length > MAX_LENGTH ? rawLabel.substring(0, MAX_LENGTH) + '\u2026' : rawLabel;
  }
}

const CreateChildren: React.FC<{ activePage: Dialob.DialobItem }> = ({ activePage }) => {
  const form = Dialob.useForm();
  const config = Dialob.useConfig();
  const items = form.state.data;
  const valueSets = form.state.valueSets;

  const props = {
    parentItemId: activePage.id,
    getItemById: (itemId: string) => items[itemId],
    getValueset: (valueSetId: string) => (valueSets && valueSetId) ? valueSets.find(v => v.id === valueSetId) : null

  };

  return (<>{
    activePage.items && activePage.items
      .map(itemId => items[itemId])
      .map(item => itemFactory(item, props, config.state.config.itemEditors))
  }</>);
}


const Editor: React.FC<{}> = ({ }) => {

  const form = Dialob.useForm();
  const editor = Dialob.useEditor();
  const config = Dialob.useConfig();
  const items = form.state.data;
  const util = useUtil();
  const lang = editor.state.activeLanguage;

  const { rootItemId } = editor.state;
  if (!rootItemId) {
    return null;
  }

  const rootItem = items[rootItemId];
  const activePageId = editor.state.activePageId ? editor.state.activePageId : (rootItem.items as string[])[0];
  const activePage = items[activePageId];

  const pages = rootItem && rootItem.items ? rootItem.items
    .map(itemId => items[itemId])
    .map((item, index) =>
      <Menu.Item onClick={() => editor.setActivePage(item.id)} key={index} active={item.id === activePageId}>{getPageTabTitle(item, lang)}
        <PageMenu item={item}/>
      </Menu.Item>) : null;

  if (activePage === undefined && pages && pages.length > 0) {
    return null;
  }

  return (
    <div>
      <Menu tabular attached='top' className='composer-pagelist'>
        {pages}
        <Menu.Menu position='right' >
          <Menu.Item>
            {(!pages || pages.length === 0) && <Label pointing='right' size='large' color='blue'>No pages yet, click here to add one</Label>}
            <Button icon='add' onClick={() => util.addItem(config.state.defaults.pageConfig, rootItemId)} disabled={!!editor.state.tag} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {pages && pages.length > 0 &&
        <Table attached='bottom' onClick={() => util.setActiveItem(activePageId, true)}>
          <Table.Body >
            <Table.Row>
              <Table.Cell >
                <Input transparent fluid placeholder='Page label' value={activePage.lablel[lang] || ''} onChange={(evt) => form.updateItem(activePageId, 'label', evt.target.value, lang)} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell error={editor.state.errors && editor.state.errors.filter(e => e.type === 'VISIBILITY' && e.itemId === activePageId).length > 0}>
                <div className='dialob-rule'>
                  <Icon name='eye' className='dialob-rule-icon' />
                  {activePage.activeWhen || <span className='dialob-placeholder'>Visibility</span>}
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      }

      <CreateChildren activePage={activePage} />

      {
        activePage &&
        <Dropdown button text='Add item' disabled={!!editor.state.tag}>
          <Dropdown.Menu>
            <ItemTypeMenu categoryFilter={(category => category.type === 'structure')} 
              onSelect={({config}) => util.addItem({...config, id: ''}, activePageId)} />
          </Dropdown.Menu>
        </Dropdown>
      }
    </div>
  );

}

export { Editor };
