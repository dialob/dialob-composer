import React from 'react';

import md_strip_tags from 'remove-markdown';
import memoize from 'memoizee';
import classnames from 'classnames';
import { List, Ref } from 'semantic-ui-react';
import { Dialob } from '../../global';
import { useItem } from '../items';
import { Dnd, DndProvider, DropPosition, getDropPosition } from './Dnd'
import { TreeItemFactory } from './TreeItemFactory';

const MAX_LENGTH = 55;


const formatLabel = memoize((label: string | undefined, type: string) => {
  if (!label) {
    return label;
  }
  const text = type === 'note' ? md_strip_tags(label) : label;
  return text.length > MAX_LENGTH ? text.substring(0, MAX_LENGTH) + '\u2026' : text;
});

const getLabel = (props: { itemType: string, itemLabel?: string, itemId: string }) => {
  const text = formatLabel(props.itemLabel, props.itemType);
  return !text ? <em>{props.itemId}</em> : text;
}



const TreeItemChildren: React.FC<{itemId: string, pageId?: string, overrides?: Dialob.ConfigItemEditors}> = (props) => {
  const form = Dialob.useForm();
  const item = useItem(props.itemId);
  const parent = item.item;
  
  const children = parent.items && parent.items
    .map(itemId => form.state.data[itemId])
    .map((child, index) => <TreeItemFactory 
      item={child}
      parent={parent}
      props={{ index, pageId: props.pageId }} 
      config={props.overrides} 
    />)
    
  if (children && children.length > 0) {
    return (<List.List>{children}</List.List>)
  }
  return null;
}



const TreeItem: React.FC<DndProvider> = (props) => {
  const [node, setNode] = React.useState<HTMLElement | null>();

  const item = useItem(props.itemId);
  const { connectDragSource, connectDropTarget, isOver, clientOffset, isPage } = props;
  const { treeCollapsed } = item;


  let dragClass = undefined;
  if (isOver && node) {
    const dropPosition = getDropPosition(
      node.getBoundingClientRect(),
      clientOffset, props.parentItemType,
      isPage ? 'page' : props.itemType,
      props.dragItem.isPage ? 'page' : props.dragItem.itemType
    );
    if (dropPosition === DropPosition.ABOVE) {
      dragClass = 'composer-drag-above';
    } else if (dropPosition === DropPosition.BELOW) {
      dragClass = 'composer-drag-below';
    } else if (dropPosition === DropPosition.INSIDE) {
      dragClass = 'composer-drag-inside';
    }
  }
  const errorLevel = item.errorLevel;

  return (
    <Ref innerRef={node => { connectDropTarget(node); connectDragSource(node); setNode(node); }}>
      <List.Item className={dragClass}>
        {
          props.treeCollapsible &&
          <List.Icon name={treeCollapsed ? 'caret right' : 'caret down'} style={{ float: 'initial' }} onClick={() => item.setTreeCollapsed(!treeCollapsed)} />
        }
        <List.Icon name={(errorLevel === 'STATUS_OK' ? props.icon : 'warning sign') as any}
          color={errorLevel === 'STATUS_ERRORS' ? 'red' : errorLevel === 'STATUS_WARNINGS' ? 'yellow' : 'black'}
          style={{ float: 'initial' }} />
        <List.Content>
          <List.Header onClick={() => item.setActive(isPage ? true : false)}
            className={classnames({
              'composer-active': item.active,
              'composer-warning': errorLevel === 'STATUS_WARNINGS',
              'composer-error': errorLevel === 'STATUS_ERRORS'
            })}
          >
            {getLabel({ itemLabel: item.itemLabel, itemType: item.item.type, itemId: item.item.id })}
          </List.Header>
          {!treeCollapsed && <TreeItemChildren itemId={props.itemId} pageId={props.pageId} overrides={props.overrides}/>}
        </List.Content>
      </List.Item>
    </Ref>);
}


const DndTreeItem = Dnd(TreeItem);
export { DndTreeItem as TreeItem }