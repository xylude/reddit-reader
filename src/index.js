import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App'
import MainScreen from './components/Main';

ReactDOM.render((
    <App>
        <MainScreen/>
    </App>
), document.getElementById('app'));