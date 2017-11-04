import firebase from '../../firebase/firebase.js';
import { getUnformattedDate } from '../../utils/dates';

function getTodaysBlog(blogs) {

  var blog = {dateKey: 1};

  //iterate the blogs and return the current blog
  for (var i in blogs) {
    const tommorrow = getUnformattedDate() + 1;
    if (blogs[i].dateKey > blog.dateKey && blogs[i].dateKey < tommorrow) {
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
