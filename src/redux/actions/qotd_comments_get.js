import firebase from '../../firebase/firebase.js';

function getQotdComments(comms) {

  var sortedComms = [];
  for (var i in comms) {
    sortedComms.push(comms[i]);
  }
  sortedComms.sort(function(a, b){return a.timestamp - b.timestamp});

  return {
    type: 'GET_QOTD_COMMENTS',
    payload: sortedComms
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
