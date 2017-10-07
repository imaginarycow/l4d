import { combineReducers } from 'redux';
import { appsFilter, storeLoad } from './apps';
import qotd from './qotd';

const combReducer = combineReducers({
  appsFilter,
  qotd,
  load: storeLoad
})

export default combReducer;
