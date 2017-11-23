import firebase from '../../firebase/firebase.js';
import { getUnformattedDate } from '../../utils/dates';

function setBlog(title, blogs) {

  if (title !== null && typeof title !== 'undefined') {

    console.log('setBlog with title: ' + title);
    var blog = null;
    for (var i in blogs) {

      if (blogs[i].title === title) {
        blog = blogs[i];
      }
    }

    return {
      type: 'SET_BLOG',
      payload: blog
    }

  } else {
    console.log('setBlog without title: ' + title);
    var blog = {dateKey: 1};
    //iterate the blogs and return the current blog
    for (var i in blogs) {
      const today = parseInt(getUnformattedDate());

      if (blogs[i].dateKey > blog.dateKey && blogs[i].dateKey <= today) {
        blog = blogs[i];
      }
    }

    return {
      type: 'SET_BLOG',
      payload: blog
    }
  }
}
function getAllBlogs(blogs) {
  var filteredBlogs = [];

  // only return blogs that have today's date or earlier
  for (var i in blogs) {
    const today = parseInt(getUnformattedDate());

    if (blogs[i].dateKey <= today) {
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
