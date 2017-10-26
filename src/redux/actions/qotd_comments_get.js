import axios from 'axios';

function getQotdComments(comms) {
  console.log(comms);
  return {
    type: 'GET_QOTD_COMMENTS',
    payload: comms
  }
}

export default function GetQotdComments(commentGroupId) {
  console.log('commentGroupId' + commentGroupId);
  return function(dispatch) {

    axios.get('https://left4dev-b2aab.firebaseio.com/comments/qotd/'+commentGroupId+'.json')
    .then((response) => {
      console.log(response);
      dispatch(getQotdComments(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
