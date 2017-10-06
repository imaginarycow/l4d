import { combineReducers } from 'redux';
import apps from './apps';
import qotd from './qotd';

const combReducer = combineReducers({
  apps,
  qotd
})

export default combReducer;
