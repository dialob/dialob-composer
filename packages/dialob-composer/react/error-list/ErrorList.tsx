import React from 'react';
import { List } from 'semantic-ui-react';
import { Dialob } from '../../global';
import groupBy from 'lodash/groupBy';
import { translateErrorType, translateErrorMessage } from './utils';

const TranslateError: React.FC<{ error: Dialob.EditorError }> = ({ error }) => {
  const type = translateErrorType(error);
  const text = translateErrorMessage(error);
  return (<>
    <>
      {type && <strong>{type}: </strong>}
      {text}
    </>
    <br />
  </>);
}

const resolveItemId = (errors: Dialob.EditorError[], form: Dialob.ComposerState) => {
  const first = errors[0];
  if (first.type.startsWith('VALUESET')) {
    const [valueSetId] = first.itemId.split(':', 2);
    const item = Object.values(form.data).find(i => i.valueSetId === valueSetId);
    if (item) {
      return item.get('id');
    } else {
      return null;
    }
  }
  return first.itemId;
}

const ErrorGroup: React.FC<{ group: Dialob.EditorError[] }> = ({ group }) => {
  const editor = Dialob.useEditor();
  const form = Dialob.useForm().state;
  const uiItemId = resolveItemId(group, form);

  const clickHandler = (itemId: string) => {
    if (group[0].type === 'VARIABLE') {
      editor.showVariables();
    } else if (itemId) {
      editor.setActiveItem(itemId);
    } else if (!itemId && group[0].type.startsWith('VALUESET')) {
      editor.showValuesets();
    }
  }
  return (<List.Item>
    <List.Icon name='warning sign' color={group[0].level != 'WARNING' ? 'red' : 'yellow'} size='large' />
    <List.Content>
      <List.Header as='a' onClick={() => clickHandler(uiItemId)}>
        {uiItemId ? uiItemId : 'Global list'}
      </List.Header>
      {group.map((m, j) => <TranslateError key={j} error={m} />)}
    </List.Content>
  </List.Item>);
}

const ErrorList = () => {
  const editor = Dialob.useEditor();
  const errors = editor.state.errors;
  if (!errors || errors.length === 0) {
    return null;
  }

  const errorMap = groupBy(errors, e => e.itemId || '$general$');
  return (<List divided>{
    Object.entries(errorMap)
      .map((entry, index) => (<ErrorGroup key={index} group={entry[1]} />))}
  </List>);
}

export { ErrorList }
