import { combineReducers } from 'redux';
import { appsFilter, lastPage } from './apps_reducer';
import { getQotw, newQotd, getQotdComments } from './qotw_reducer';
import { getBlogs, getLatestBlog, setBlog, newBlog, getBlogComments } from './blog_reducer';
import { loginUser } from './user_reducer';
import { getDoodles } from './doodles_reducer';
import { getWorstMatchups, getWorstComments, newWorstMatchup } from './worst_reducer';
import { setLastPage } from './page_reducer';


const combReducer = combineReducers({
  appsFilter,
  currQotw: getQotw,
  newQotd: newQotd,
  qotdComments: getQotdComments,
  doodles: getDoodles,
  lastPage: lastPage,
  newBlog: newBlog,
  allBlogs: getBlogs,
  latestBlog: getLatestBlog,
  currBlog: setBlog,
  blogComments: getBlogComments,
  user: loginUser,
  worstMatchups: getWorstMatchups,
  worstComments: getWorstComments,
  lastPage: setLastPage
})

export default combReducer;
