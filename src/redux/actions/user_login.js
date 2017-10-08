import axios from 'axios';

function logUserIn(user) {

  return {
    type: 'LOGIN_USER',
    payload: blog
  }
}

export default function LoginUser() {

  return function(dispatch) {
    axios.get('https://left4dev-b2aab.firebaseio.com/apps/Blog.json')
    .then((response) => {
      dispatch(getTodaysBlog(response))
    })
    .catch((error) => {
      console.log(error);
    });

  }
}
