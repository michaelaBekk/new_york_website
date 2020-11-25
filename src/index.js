import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';


ReactDOM.render( <Pages /> , document.getElementById('root'));


serviceWorker.unregister();
