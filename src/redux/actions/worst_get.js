import firebase from '../../firebase/firebase.js';

function getWorstMatchups(matches) {


  return {
    type: 'GET_WORST_MATCHUPS',
    payload: matches
  }
}

export default function WorstLoad() {

  return function(dispatch) {

    var worstRef = firebase.database().ref('apps/worst/');
    worstRef.once('value', function(snapshot) {
      dispatch(getWorstMatchups(snapshot.val()));
    });

  }
}
