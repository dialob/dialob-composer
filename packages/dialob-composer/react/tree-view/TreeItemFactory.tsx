import React from 'react';
import { Dialob } from '../../global';
import { TreeItem } from './TreeItem'

const TreeItemFactory: React.FC<{
  item: Dialob.DialobItem,
  parent?: Dialob.DialobItem,
  props: { index: number, pageId?: string, isPage?: boolean } 
  config?: Dialob.ConfigItemEditors 
}> = ({ item, props, config: overrides, parent }) => {
    
  const { state } = Dialob.useConfig();
  const { moveItem } = Dialob.useForm();
  const config = overrides ? overrides : state.config.itemEditors; 
  if (!item) {
    return null;
  }
  
  let itemConfig = config.items.find(c => c.matcher(item, props));
  if (itemConfig && itemConfig.hideInTree) {
    return null;
  }
  return itemConfig ? <TreeItem key={item.id} 
    itemType={item.type} 
    itemId={item.id} 
    {...itemConfig.props}
    index={props.index}
    pageId={props.pageId}
    isPage={props.isPage ? true : false}
    parentItemId={parent?.id}
    parentItemType={parent?.type}
    
    moveItem={(move) => moveItem(move.itemId, 
        move.fromIndex, move.toIndex, 
        move.fromParent, move.toParent
      ) }
    /> : null;
}

export {
  TreeItemFactory
};
