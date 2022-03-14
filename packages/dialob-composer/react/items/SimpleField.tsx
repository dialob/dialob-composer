import React from 'react';
import { Table, Input, Icon } from 'semantic-ui-react';

import ItemMenu from '../components/ItemMenu';
import Validations from '../components/Validations';
import Scrolltarget from './Scrolltarget';
import ConvertItem from '../components/ConvertItem';
import { useItem } from './useItem';



const SimpleField: React.FC<{ itemId: string, itemType: string, parentItemId?: string, placeholder?: string }> = ({ itemId, parentItemId, placeholder }) => {

  const props = useItem(itemId);

  return (
    <Scrolltarget itemId={itemId} className='composer-scrolltarget'>
      <Table onClick={(e: MouseEvent) => { e.stopPropagation(); props.setActive(true); }} attached={'top'} color={props.borderColor as any}>
        <Table.Body>
          <Table.Row>
            <Table.Cell selectable collapsing width={2} >
              <a onClick={() => { if (props.editable) { props.changeId(); } }}>{itemId}</a>
            </Table.Cell>
            <Table.Cell>
              <Input transparent fluid placeholder={placeholder} value={props.itemLabel || ''} onChange={(e) => props.setAttribute('label', e.target.value, props.language)} />
            </Table.Cell>
            <Table.Cell collapsing>
              <ConvertItem itemType={props.item.type} viewType={props.item.view} itemId={itemId} />
            </Table.Cell>
            <Table.Cell collapsing>
              <ItemMenu item={props.item} parentItemId={parentItemId} onDelete={props.deleteItem} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Table onClick={(e: MouseEvent) => { e.stopPropagation(); props.setActive(true); }} celled attached={props.active ? true : 'bottom'} >
        <Table.Body>
          <Table.Row>
            <Table.Cell error={props.errors.filter(e => e.type === 'VISIBILITY').length > 0}>
              <div className='dialob-rule'>
                <Icon name='eye' className='dialob-rule-icon' />
                {props.item.activeWhen || <span className='dialob-placeholder'>Visibility</span>}
              </div>
            </Table.Cell>
          </Table.Row>
          {
            props.active &&
            <React.Fragment>
              <Table.Row>
                <Table.Cell error={props.errors.filter(e => e.type === 'REQUIREMENT').length > 0}>
                  <div className='dialob-rule'>
                    <Icon name='gavel' className='dialob-rule-icon' />
                    {props.item.required || <span className='dialob-placeholder'>Requirement</span>}
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell error={props.errors.filter(e => e.type === 'GENERAL' && e.message === 'INVALID_DEFAULT_VALUE').length > 0}>
                  <Input icon='pencil' transparent fluid placeholder='Default value' value={props.item.defaultValue || ''} onChange={(e) => props.setAttribute('defaultValue', e.target.value)} />
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          }
        </Table.Body>
      </Table>
      {
        props.active && <Validations item={props.item} validations={props.validations} readOnly={!props.editable} />
      }
    </Scrolltarget>
  );
}

export {
  SimpleField
};
