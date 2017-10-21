import axios from 'axios';

function getTodaysBlog(blogs) {

  var blog = {};

  //iterate the blogs and return the current blog
  for (var i in blogs.data) {

    if (blogs.data[i].isCurrent == true) {
      blog = blogs.data[i];
    }
  }

  return {
    type: 'GET_BLOG',
    payload: blog
  }
}

export default function BlogLoad() {

  return function(dispatch) {
    axios.get('https://left4dev-b2aab.firebaseio.com/apps/blog.json')
    .then((response) => {
      dispatch(getTodaysBlog(response))
    })
    .catch((error) => {
      console.log(error);
    });

  }
}
