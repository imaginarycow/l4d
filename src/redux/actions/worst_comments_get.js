import axios from 'axios';

function getWorstComments(comms) {

  return {
    type: 'GET_BLOG_COMMENTS',
    payload: comms
  }
}

export default function GetBlogComments(commentGroup) {

  return function(dispatch) {

    axios.get('https://left4dev-b2aab.firebaseio.com/comments/worst/'+commentGroup+'.json')
    .then((response) => {
      console.log(response);
      dispatch(getWorstComments(response.data))
    })
    .catch((error) => {
      console.log(error);
    });

  }
}
