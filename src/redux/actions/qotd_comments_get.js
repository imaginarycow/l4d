import firebase from '../../firebase/firebase.js';

function getQotwComments(comms) {

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

export default function GetQotwComments(commentGroup) {
  console.log('commentGroupId' + commentGroup);
  return function(dispatch) {

    var qotdCommentsRef = firebase.database().ref('comments/qotw/'+commentGroup);
    qotdCommentsRef.on('value', function(snapshot) {
      dispatch(getQotwComments(snapshot.val()));
    });

  }
}
