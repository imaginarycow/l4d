import firebase from '../../firebase/firebase.js';


function getDoodles(doodles) {

  return {
    type: 'GET_DOODLES',
    payload: doodles
  }
}

export default function DoodlesLoad() {

  return function(dispatch) {

    var doodlesRef = firebase.database().ref('apps/doodles/');
    doodlesRef.once('value', function(snapshot) {
      dispatch(getDoodles(snapshot.val()));
    });

  }
}
