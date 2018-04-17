import firebase from '../../firebase/firebase.js';
import toastr from 'toastr';
import '../../toastr/build/toastr.css';

export function updateLoggedInUser(user) {
  console.log('user updated');
  console.log(user.email);
  // const loggedInUser = {

  //   email: user.email,
  //   username: user.displayName,
  //   image: user.photoURL
  // }

  return {
    type: 'LOGIN_USER',
    payload: user
  }
}

export function updateLocalUserObject(user) {
  console.log('user type');
  console.log(typeof user);
  if (user !== null) {

    return function(dispatch) {
      let userRef = firebase.database().ref('users/'+user.uid);
            userRef.on('value', function(snapshot) {
              dispatch(updateLoggedInUser(snapshot.val()));
            });
    }
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
      // .then((user) => {
      //   //successful login to firebase, then get custom user object
      //   console.log('user successfully logged in');
      //   dispatch(updateLocalUserObject(user));
      // })
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
