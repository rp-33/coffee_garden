import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import combine from './reducers/';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store = {combine}>
        <App />
    </Provider>
    
,document.getElementById('root'));

serviceWorker.unregister();
