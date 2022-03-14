import React from 'react';
import {Segment, Table, Icon} from 'semantic-ui-react';
import classnames from 'classnames';

import {useItem} from './useItem';
import Scrolltarget from './Scrolltarget';
import ItemMenu from '../components/ItemMenu';
import { MarkdownEditor } from '../components/MarkdownEditor';

const Note: React.FC<{itemId: string, itemType: string, parentItemId?: string}> = ({itemId, parentItemId}) => {
  
    const { language, setActive, borderColor, editable, changeId, item, deleteItem, errors, active, setAttribute } = useItem(itemId);
  
    const editorKey = `nrt_${itemId}_${language}`;
    return (
      <Scrolltarget itemId={itemId} className='composer-scrolltarget'>
         <Table attached='top' onClick={(e) => {e.stopPropagation(); setActive(true);}} color={borderColor as any}>
          <Table.Body>
            <Table.Row>
              <Table.Cell selectable>
                <a onClick={() => {if (editable) { changeId(); }}}>{itemId}</a>
              </Table.Cell>
              <Table.Cell collapsing>
                <ItemMenu item={item} parentItemId={parentItemId} onDelete={deleteItem}/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        { active &&
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
        }
        <Segment onClick={(e: MouseEvent) => {e.stopPropagation(); setActive(true);}}  className={classnames({'composer-active': active}, 'composer-segment-nopadding')} attached='bottom'>
          <MarkdownEditor key={editorKey} onChange={(v: string) => setAttribute('label', v, language)} value={item.label? item.label[language] : ''} />
        </Segment>
      </Scrolltarget>
    );
  
}
export { Note };
