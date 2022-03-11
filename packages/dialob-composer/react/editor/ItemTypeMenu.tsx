import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Dialob } from '../../global';

const ItemTypeMenu: React.FC<{
  categoryFilter?: (type: Dialob.ConfigCategoryType) => boolean,
  itemTypeFilter?: (type: Dialob.ConfigItemType) => boolean,
  onSelect: (type: Dialob.ConfigItemType) => void
}> = (props) => {

  const config = Dialob.useConfig();

  return (<>{config.state.config.itemTypes.categories
    .filter(props.categoryFilter || (i => i))
    .map((category, ckey) => (
      <Dropdown key={ckey} item text={category.title} closeOnChange lazyLoad className='composer-item-menu'>
        <Dropdown.Menu>
          {
            category.items.filter(props.itemTypeFilter || (i => i)).map((item, ikey) => (
              <Dropdown.Item key={ikey} onClick={() => props.onSelect(item)}>
                {item.title}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    ))
  }</>);

}

export default ItemTypeMenu;
