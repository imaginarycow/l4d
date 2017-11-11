import firebase from '../../firebase/firebase.js';
import { getUnformattedDate } from '../../utils/dates';

function getTodaysBlog(blogs) {
  console.log(blogs);
  var blog = {dateKey: 1};

  //iterate the blogs and return the current blog
  for (var i in blogs) {
    const today = parseInt(getUnformattedDate());
    console.log(today);
    if (blogs[i].dateKey > blog.dateKey && blogs[i].dateKey <= today) {
      blog = blogs[i];
    }
  }

  return {
    type: 'GET_BLOG',
    payload: blog
  }
}

export default function BlogLoad() {

  return function(dispatch) {

    var blogRef = firebase.database().ref('apps/blog/');
    blogRef.once('value', function(snapshot) {
      dispatch(getTodaysBlog(snapshot.val()));
    });

  }
}
