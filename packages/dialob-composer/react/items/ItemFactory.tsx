import React from 'react';
import { Dialob } from '../../global';


const ItemFactory: React.FC<{item: Dialob.DialobItem, props: {}, config?: Dialob.ConfigItemEditors }> = ({ item, props, config: overrides }) => {
  const { state } = Dialob.useConfig();
  const config = overrides ? overrides : state.config.itemEditors; 
  if (!item) {
    return null;
  }

  const itemConfig = config.items.find(c => c.matcher(item, props))
  if (!itemConfig) {
    console.warn('Unknown type:', item.type);
    return  null;
  }

  return <itemConfig.component 
    key={item.id} itemType={item.type} itemId={item.id} 
    {...itemConfig.props} {...props} 
  />;
}

export { ItemFactory }