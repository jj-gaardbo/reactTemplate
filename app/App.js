import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeMessage from './components/WelcomeMessage.jsx';
import SCSS from './styles/app.scss';

const appData = {
  title: 'React Webtemplate'
};

ReactDOM.render(
  <WelcomeMessage data={appData} />, document.getElementById('root')
);
