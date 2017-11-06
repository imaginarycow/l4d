import firebase from '../../firebase/firebase.js';

function getQotdComments(comms) {
  console.log(comms);
  return {
    type: 'GET_QOTD_COMMENTS',
    payload: comms
  }
}

export default function GetQotdComments(commentGroup) {
  console.log('commentGroupId' + commentGroup);
  return function(dispatch) {

    var qotdCommentsRef = firebase.database().ref('comments/qotd/'+commentGroup);
    qotdCommentsRef.on('value', function(snapshot) {
      dispatch(getQotdComments(snapshot.val()));
    });

  }
}
