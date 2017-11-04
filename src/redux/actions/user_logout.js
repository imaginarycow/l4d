import firebase from '../../firebase/firebase.js';

export function logUserOut() {

  const loggedOutUser = {

    email: 'undefined',
    username: 'undefined',
    image: 'undefined'
  }

  return {
    type: 'LOGOUT_USER',
    payload: loggedOutUser
  }
}

export default function LogoutUser() {

  return function(dispatch) {

    firebase.auth().signOut()
    .then(() => {
      dispatch(logUserOut());
    });

  }

}
