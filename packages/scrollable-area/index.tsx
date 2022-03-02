import React from 'react';
const scroll = require("react-redux-scroll");

const scrollableEditor = (EditorColumn: React.FC<{}>) => scroll.scrollableArea(EditorColumn);


export {scrollableEditor}