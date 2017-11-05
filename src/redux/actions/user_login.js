import firebase from '../../firebase/firebase.js';
import toastr from 'toastr';
import '../../toastr/build/toastr.css';

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

    toastr.options = {
      "positionClass": "toast-top-center",
    }

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
          toastr.error('Invalid password.');
        }
        else if (errorCode === 'auth/invalid-email') {
          toastr.error('Invalid email.');
        }
         else if (errorCode === 'auth/user-not-found'){
          toastr.error('No user found with this email address');
        }
      });

    });

  }

}
