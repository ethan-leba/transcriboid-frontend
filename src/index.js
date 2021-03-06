import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import EmitterApp from './App';
import * as serviceWorker from './serviceWorker';

render (
    <BrowserRouter>
      <EmitterApp />
    </BrowserRouter>,
    document.querySelector('#root')
    )
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
