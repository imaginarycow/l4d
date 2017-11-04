import firebase from '../../firebase/firebase.js';

export function logUserIn(user) {

  const loggedInUser = {

    email: user.email,
    username: user.displayName,
    image: user.photoURL
  }

  return {
    type: 'LOGIN_USER',
    payload: loggedInUser
  }
}

export default function LoginUser(email, pass) {

  return function(dispatch) {


    firebase.auth().setPersistence(firebase.firebase_.auth.Auth.Persistence.LOCAL)
    .then(function() {

      firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((response) => {
        dispatch(logUserIn(response));
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Invalid password.');
        }
        else if (errorCode === 'auth/invalid-email') {
          alert('Invalid email.');
        } else {
          alert(errorMessage);
        }
      });

    });

  }

}
