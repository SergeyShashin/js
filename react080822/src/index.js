import React from 'react';
import ReactDom from 'react-dom';

let element = React.createElement(
  'h1',
  { className: 'react-element' },
  'Реакт работает!'
);

ReactDom.render(
  element,
  document.getElementById('root')
);