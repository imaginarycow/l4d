import firebase from '../../firebase/firebase.js';

function getWorstComments(comms) {

  return {
    type: 'GET_WORST_COMMENTS',
    payload: comms
  }
}

export default function GetWorstComments(commentGroup) {

  return function(dispatch) {

    var worstCommentsRef = firebase.database().ref('comments/worst/'+commentGroup);
    worstCommentsRef.on('value', function(snapshot) {
      dispatch(getWorstComments(snapshot.val()));
    });

  }
}
