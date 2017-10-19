import { combineReducers } from 'redux';
import { appsFilter, storeLoad } from './apps_reducer';
import { getQotd, newQotd } from './qotd_reducer';
import { getBlog, newBlog, getBlogComments } from './blog_reducer';
import { loginUser, createUser } from './user_reducer';


const combReducer = combineReducers({
  appsFilter,
  currQotd: getQotd,
  newQotd: newQotd,
  load: storeLoad,
  newBlog: newBlog,
  currBlog: getBlog,
  blogComments: getBlogComments,
  user: loginUser
})

export default combReducer;