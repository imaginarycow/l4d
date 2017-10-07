import axios from 'axios';

function getTodaysBlog(blog) {
  console.log("action");
  return {
    type: 'GET_BLOG',
    payload: blog
  }
}

export default function BlogLoad() {

  return function(dispatch) {

    axios.get('https://left4dev-b2aab.firebaseio.com/apps/Blog.json')
    .then((response) =>
      dispatch(getTodaysBlog(response))
    )
    .catch((error) => {
      console.log(error);
    });

  }
}
