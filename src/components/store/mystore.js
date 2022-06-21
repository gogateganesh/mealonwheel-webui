import { createStore } from 'redux';
import reducer from './reducer';

const initstate = {loggedin : true,menuitem: {}}

const store = createStore(reducer,initstate);

export default store;