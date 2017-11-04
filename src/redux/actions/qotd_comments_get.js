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

    var blogCommentsRef = firebase.database().ref('comments/qotd/'+commentGroup).orderByChild('timestamp');
    blogCommentsRef.on('value', function(snapshot) {
      dispatch(getQotdComments(snapshot.val()));
    });

  }
}
