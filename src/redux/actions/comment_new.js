import firebase from '../../firebase/firebase.js';


export default function PostNewComment(app, commentGroup, newKey, newComment) {

  const postUrl = 'comments/'+app+'/'+commentGroup+'/'+newKey+'/';

  return function(dispatch) {
    firebase.database().ref(postUrl).set(newComment)
    .then((response) => {
      console.log('successful comment submission');
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
