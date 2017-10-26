import firebase from '../../firebase/firebase.js';
import GetBlogComments from './blog_comments_get';

export default function PostNewComment(app, commentGroup, newKey, newComment) {

  const postUrl = 'comments/'+app+'/'+commentGroup+'/'+newKey+'/';

  return function(dispatch) {
    firebase.database().ref(postUrl).set(newComment)
    .then((response) => {
      dispatch(GetBlogComments());
    })
    .catch((error) => {
      console.log(error);
    });
  }



  // return function(dispatch) {
  //
  //   axios.post(postUrl, newComment)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  //
  // }
}
