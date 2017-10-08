import axios from 'axios';

function getBlogComments(comms) {

  return {
    type: 'GET_BLOG_COMMENTS',
    payload: comms
  }
}

export default function GetBlogComments(commentGroup) {

  return function(dispatch) {

    axios.get('https://left4dev-b2aab.firebaseio.com/comments/blog/'+commentGroup+'.json')
    .then((response) => {
      console.log(response);
      dispatch(getBlogComments(response.data))
    })
    .catch((error) => {
      console.log(error);
    });

  }
}