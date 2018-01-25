import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import { rootReducer } from './reducers/root';
import { App } from './components/App';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
