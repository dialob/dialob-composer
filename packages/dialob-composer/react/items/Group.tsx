import React from 'react';
import {Input, Segment, Table, Dropdown, Icon} from 'semantic-ui-react';

import classnames from 'classnames';
import Scrolltarget from './Scrolltarget';

import { Dialob } from '../../global';
import {useItem} from './useItem';

import ItemTypeMenu from '../components/ItemTypeMenu';
import ItemMenu from '../components/ItemMenu';
import ConvertItem from '../components/ConvertItem';


const Group: React.FC<{itemId: string, itemType: string, parentItemId?: string, placeholder?: string}> = ({itemId, parentItemId, placeholder}) => {
    
    const { language, setActive, borderColor, editable, changeId, 
            item, deleteItem, errors, active, setAttribute, treeCollapsed, setTreeCollapsed, createChildren,
            newItem } = useItem(itemId);
    
    const itemTypeFilter = (i: Dialob.DialobItem) => item.type !== 'surveygroup' ? i.config.type !== 'survey' : true;

    return (
      <Scrolltarget itemId={itemId} className='composer-scrolltarget'>
        <Table attached={treeCollapsed ? undefined :'top'} onClick={(e: MouseEvent) => {e.stopPropagation(); setActive(true);}} color={borderColor as any}>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                <Icon name={treeCollapsed ? 'caret right' : 'caret down'} size='large' fitted onClick={() => setTreeCollapsed(!treeCollapsed)}/>
              </Table.Cell>
              <Table.Cell selectable collapsing width={2}>
                <a onClick={() => {if (editable) { changeId(); }}}>{itemId}</a>
              </Table.Cell>
              <Table.Cell>
                <Input transparent fluid placeholder={placeholder} value={(item.label as any)[language] || ''} 
                  onChange={(e) => setAttribute('label', e.target.value, language)}/>
              </Table.Cell>
              <Table.Cell collapsing>
                <ConvertItem itemType={item.type} viewType={item.view} itemId={itemId}/>
              </Table.Cell>
              <Table.Cell collapsing>
                <ItemMenu item={item} parentItemId={parentItemId} onDelete={deleteItem}/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        { !treeCollapsed ?
         <React.Fragment>
            <Table onClick={(e: MouseEvent) => {e.stopPropagation(); setActive(true);}}  celled attached >
              <Table.Body>
                <Table.Row>
                  <Table.Cell error={errors.filter(e => e.type === 'VISIBILITY').length > 0}>
                    <div className='dialob-rule'>
                      <Icon name='eye' className='dialob-rule-icon' />
                      {item.activeWhen || <span className='dialob-placeholder'>Visibility</span>}
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Segment onClick={(e: MouseEvent) => {e.stopPropagation(); setActive(true);}}  className={classnames('composer-group', {'composer-active': active})} attached='bottom'>
              {createChildren({parentItemId: itemId })}
              <Dropdown button text='Add item' disabled={!editable} lazyLoad>
                <Dropdown.Menu>
                  <ItemTypeMenu itemTypeFilter={itemTypeFilter} onSelect={(config: Dialob.DialobItem) => newItem(config, itemId)}/>
                </Dropdown.Menu>
              </Dropdown>
            </Segment>
        </React.Fragment>
        : null
        }
      </Scrolltarget>);
  }

export {
  Group,
};
