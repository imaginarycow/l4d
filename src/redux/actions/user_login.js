import firebase from '../../firebase/firebase.js';

function logUserIn(user) {
  console.log('logUserIn called');
  console.log(user);
  return {
    type: 'LOGIN_USER',
    payload: user
  }
}

export default function LoginUser(email, pass) {

  return function(dispatch) {

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((response) => {
      dispatch(logUserIn(response))
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
  }

  // firebase.auth().signInWithEmailAndPassword(email, pass)
  //   .then(function(user) {
  //     console.log(user);
  //   })
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     //let attempCount = this.state.attempts + 1;
  //     //this.setState({attempts: attempCount});
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     if (errorCode === 'auth/wrong-password') {
  //       alert('Invalid password.');
  //     }
  //     else if (errorCode === 'auth/invalid-email') {
  //       alert('Invalid email.');
  //     } else {
  //       alert(errorMessage);
  //     }
  // });
}
