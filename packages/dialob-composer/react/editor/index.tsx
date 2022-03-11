import React from 'react';
const scroll = require("react-redux-scroll");

const scrollableEditor = (EditorColumn: React.FC<{}>) => scroll.scrollableArea(EditorColumn);
const EditorColumn: React.FC<{}> = () => (<div className='composer-editor-content'><Editor /></div>);
const ScrollableEditor = scrollableEditor(EditorColumn);

export { ScrollableEditor }