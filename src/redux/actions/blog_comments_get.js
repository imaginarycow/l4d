import firebase from '../../firebase/firebase.js';

function getBlogComments(comms) {
  console.log('comments returned' + comms);
  return {
    type: 'GET_BLOG_COMMENTS',
    payload: comms
  }
}

export default function GetBlogComments(commentGroup) {
  console.log('BlogcommentGroup' + commentGroup);
  return function(dispatch) {

    var blogCommentsRef = firebase.database().ref('comments/blog/'+commentGroup).orderByChild('timestamp');
    blogCommentsRef.on('value', function(snapshot) {
      dispatch(getBlogComments(snapshot.val()));
    });

  }
}
