import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import thunkMiddleware from 'redux-thunk'

import RootReducer from "./reducers";

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(RootReducer, composePlugin(applyMiddleware(promise, thunkMiddleware)));
//createStoreWithMiddleware(RootReducer)

class App extends Component {
  render() {
    return (
      <Provider store={store} >
          <BrowserRouter>
            <div>
              {/* App Component Has a Child Component called Main*/}
              <Main />
            </div>
          </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
