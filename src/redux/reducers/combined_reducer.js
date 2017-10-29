import { combineReducers } from 'redux';
import { appsFilter, storeLoad } from './apps_reducer';
import { getQotd, newQotd, getQotdComments } from './qotd_reducer';
import { getBlog, newBlog, getBlogComments } from './blog_reducer';
import { loginUser } from './user_reducer';
import { getDoodles } from './doodles_reducer';
import { getWorstMatchups, getWorstComments, newWorstMatchup } from './worst_reducer';


const combReducer = combineReducers({
  appsFilter,
  currQotd: getQotd,
  newQotd: newQotd,
  qotdComments: getQotdComments,
  doodles: getDoodles,
  load: storeLoad,
  newBlog: newBlog,
  currBlog: getBlog,
  blogComments: getBlogComments,
  user: loginUser,
  worstMatchups: getWorstMatchups,
  worstComments: getWorstComments
})

export default combReducer;
