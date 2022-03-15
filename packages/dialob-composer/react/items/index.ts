import {Group, SimpleField, Note} from '../items';
import { Dialob } from '../../global';


export { Group } from './Group';
export { SimpleField } from './SimpleField';
export { Note  } from './Note';
export { ItemFactory } from './ItemFactory';
export { useItem } from './useItem';


export const DEFAULT_ITEM_CONFIG: Dialob.ConfigItemEditors = {
  items: [
    {
      matcher: item => item.type === 'group',
      component: Group,
      props: {
        icon: 'square outline',
        placeholder: 'Group label',
        treeCollapsible: true,
      }
    },
    {
      matcher: item => item.type === 'surveygroup',
      component: Group,
      props: {
        icon: 'braille',
        placeholder: 'Survey group label',
        treeCollapsible: true
      }
    },
    {
      matcher: item => item.type === 'rowgroup',
      component: Group,
      props: {
        icon: 'table',
        placeholder: 'Multi-row group label',
        treeCollapsible: true
      }
    },
    {
      matcher: item => item.type === 'survey',
      component: SimpleField,
      props: {
        icon: 'ellipsis horizontal',
        placeholder: 'Survey field label'
      }
    },
    {
      matcher: item => item.view === 'address',
      component: SimpleField,
      props: {
        icon: 'map marker alternate',
        placeholder: 'Address field label'
      }
    },
    {
      matcher: item => item.type === 'text',
      component: SimpleField,
      props: {
        icon: 'font',
        placeholder: 'Text field label'
      }
    },
    {
      matcher: item => item.type === 'time',
      component: SimpleField,
      props: {
        icon: 'time',
        placeholder: 'Time field label'
      }
    },
    {
      matcher: item => item.type === 'date',
      component: SimpleField,
      props: {
        icon: 'calendar',
        placeholder: 'Date field label'
      }
    },
    {
      matcher: item => item.type === 'number',
      component: SimpleField,
      props: {
        icon: 'hashtag',
        placeholder: 'Number field label'
      }
    },
    {
      matcher: item => item.type === 'decimal',
      component: SimpleField,
      props: {
        icon: 'currency',
        placeholder: 'Decimal field label'
      }
    },
    {
      matcher: item => item.type === 'boolean',
      component: SimpleField,
      props: {
        icon: 'checkmark box',
        placeholder: 'Boolean field label'
      }
    },
    {
      matcher: item => item.type === 'list',
      component: SimpleField,
      props: {
        icon: 'angle down',
        placeholder: 'List field label'
      }
    },
    {
      matcher: item => item.type === 'multichoice',
      component: SimpleField,
      props: {
        icon: 'list',
        placeholder: 'Multi-choice field label'
      }
    },
    {
      matcher: item => item.type === 'note',
      component: Note,
      props: {
        icon: 'file outline',
        placeholder: 'List field label'
      }
    }
  ]
};