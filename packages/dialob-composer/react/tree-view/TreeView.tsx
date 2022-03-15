import React from 'react';
import { Menu, List } from 'semantic-ui-react';
import { TreeItem } from './TreeItem';

import { Dialob } from '../../global';

const TreeView: React.FC<{}> = () => {
  const editor = Dialob.useEditor();
  const form = Dialob.useForm();

  const rootItem = form.state.data[editor.state.rootItemId];
  const treeItems = rootItem && rootItem.items && rootItem.items
    .map(itemId => form.state.data[itemId])
    .map((page, index) => <TreeItem
      treeCollapsible={true}
      index={index}
      parentItemId={rootItem.id}
      parentItemType={rootItem.type}
      isPage={true}
      id={page.id}
      key={page.id}
      itemId={page.id}
      icon='folder'
      pageId={page.id}
      itemType={page.type}
      placeholder={''}
      moveItem={(move) => form.moveItem(move.itemId,
        move.fromIndex, move.toIndex,
        move.fromParent, move.toParent
      )}
    />);

  return (
    <Menu vertical>
      <Menu.Item>
        <List size='small'>
          {treeItems}
        </List>
      </Menu.Item>
    </Menu>);

}

export {
  TreeView
};

