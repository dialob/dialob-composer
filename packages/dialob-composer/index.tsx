import React from 'react';
import { Dialob } from './global';



const DialobComposer: React.FC<{}> = () => {
  const marginTop = '42px';
  const paddingBottom = '55px';
  const menuWidth = '300px';

  return (<>
    <Dialob.FC.MainMenu />
    <div className='composer-editor-wrapper'>
      <div className='composer-editor-tree'>
        <Dialob.FC.TreeView marginTop={marginTop} menuWidth={menuWidth} paddingBottom={paddingBottom} />
      </div>
      <Dialob.FC.ScrollableEditor />
      <div className='composer-editor-errors'>
        <Dialob.FC.ErrorList />
      </div>
      <div className='composer-editor-rules'>
        <Dialob.FC.RuleEditor />
      </div>
    </div>
    {/*

    <ConfirmationDialog />
    <ItemOptionsDialog />
    <FormOptionsDialog />
    <VariablesDialog />
    <IdChangeDialog />
    <PreviewContextDialog />
    <ValueSetDialog />
    <TranslationDialog />
    <FatalErrorDialog />
    <VersioningDialog />
    <NewTagDialog />
    */}
  </>);
}



export default DialobComposer;
