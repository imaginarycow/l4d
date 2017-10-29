import firebase from '../../firebase/firebase.js';

function logUserIn(user) {

  return {
    type: 'LOGIN_USER',
    payload: user
  }
}

export default function LoginUser(email, pass) {

  return function(dispatch) {


    firebase.auth().setPersistence(firebase.firebase_.auth.Auth.Persistence.SESSION)
    .then(function() {

      firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((response) => {
        dispatch(logUserIn(response));
        //window.location.replace("https://www.left4dev.com");

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
