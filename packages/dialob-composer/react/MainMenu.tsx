import React from 'react';
import { Container, Menu, Icon, Dropdown, Popup } from 'semantic-ui-react';

import StatusIndicator from './StatusIndicator';
import SearchMenu from './SearchMenu';
import { Dialob } from '../global';
import { useUtil } from './util';

const Languages: React.FC<{}> = () => {
  const config = Dialob.useConfig();
  const form = Dialob.useForm();
  const formLanguages = form.state.metadata.languages;
  const editor = Dialob.useEditor();
  

  return (<>{
    config.state.config.defaults.languages
      .filter(lang => formLanguages?.includes(lang.code))
      .map((lang, i) =>
        <Dropdown.Item key={i} active={lang.code === editor.state.activeLanguage}
          onClick={() => editor.setActiveLang(lang.code)}>{lang.name}</Dropdown.Item>)
  }</>);
}


const MainMenu: React.FC<{}> = ({ }) => {
  const config = Dialob.useConfig();
  const form = Dialob.useForm();
  const editor = Dialob.useEditor();
  const {downloadForm, requestPreview} = useUtil();
  const formTag = editor.state.tag;
  const status = editor.state.status;

  return (
    <Container>
      <Menu fixed='top'>
        <Menu.Item header>
          Dialob Composer
          &nbsp;<small>{form.state.metadata.label}</small>
        </Menu.Item>

        <Menu.Item onClick={editor.showTranslation}>
          Translations
        </Menu.Item>
        <Menu.Item onClick={editor.showVariables}>
          Variables
        </Menu.Item>
        <Menu.Item onClick={editor.showValuesets}>
          Lists
        </Menu.Item>
        <Menu.Item onClick={editor.showFormOptions}>
          Options
        </Menu.Item>
        <Dropdown item text={`Version: ${formTag}`} lazyLoad>
          <Dropdown.Menu>
            <Dropdown.Item onClick={editor.showVersioningDialog}>Manage versions...</Dropdown.Item>
            <Dropdown.Item
              disabled={formTag !== 'LATEST' || (status !== 'STATUS_OK' && status !== 'STATUS_WARNINGS')}
              onClick={() => editor.showNewTag()}>
              Create version tag
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item onClick={() => {
          let win = window.open(config.state.config.defaults.documentationUrl);
          if (win) {
            win.focus();
          }
        }}>
          <Popup
            trigger={<Icon name='life ring outline' />}
            content='Dialob Composer User Guide'
            on='hover' />
        </Menu.Item>
        <Menu.Menu position='right'>
          <SearchMenu />
          <Menu.Item onClick={() => downloadForm()}>
            <Popup
              trigger={<Icon name='download' />}
              content='Download dialog as JSON'
              on='hover' />
          </Menu.Item>
          <Menu.Item>
            <StatusIndicator status={status} />
          </Menu.Item>
          <Dropdown item text={config.getLanguageName(editor.state.activeLanguage)} lazyLoad>
            <Dropdown.Menu>
              <Languages />
            </Dropdown.Menu>
          </Dropdown>
          {
            config.state.config.transport.previewUrl &&
            <Menu.Item disabled={status !== 'STATUS_OK' && status !== 'STATUS_WARNINGS'}
              onClick={requestPreview}>
              <Icon name='eye' />Preview
            </Menu.Item>
          }

          <Menu.Item icon='close' onClick={config.state.config.closeHandler} />
        </Menu.Menu>
      </Menu>
    </Container>
  );
}

export { MainMenu };
