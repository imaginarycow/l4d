import firebase from '../../firebase/firebase.js';
import { getUnformattedDate } from '../../utils/dates';

function setBlog(title, blogs) {

  if (title !== null && typeof title !== 'undefined') {

    var blog = null;
    var matchFound = false;
    //create Array from Blogs collection of objects
    for (var i in blogs) {
      if (blogs[i].urltitle === title) {
        blog = blogs[i];
      }
    }
    if (blog === null) { 
      return {
        type:'SET_BLOG',
        payload: 'undefined' };
    }
    
    return {
      type: 'SET_BLOG',
      payload: blog
    }

  } else {

    return {
      type: 'SET_BLOG',
      payload: null
    }
  }
}
function getAllBlogs(blogs) {

  let filteredBlogs = [];

  // only return blogs that have today's date or earlier
  for (var i in blogs) {
    if (blogs[i].publish == true) {
      filteredBlogs.push(blogs[i]);
    }
  }

  return {
    type: 'GET_ALL_BLOGS',
    payload: filteredBlogs
  }
}

export default function BlogLoad(title) {

    return function(dispatch) {
      const blogRef = firebase.database().ref('apps/blog/');

      blogRef.once('value', function(snapshot) {
        const blogs = snapshot.val();

        dispatch(getAllBlogs(blogs));
        dispatch(setBlog(title, blogs));
      });

    }

}
