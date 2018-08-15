import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log('current state is: ', store.getState());
});

export default store;