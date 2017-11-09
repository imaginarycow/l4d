import firebase from '../../firebase/firebase.js';

function getBlogComments(comms) {
  console.log(comms);

  return {
    type: 'GET_BLOG_COMMENTS',
    payload: comms
  }
}

function sortArray(comms) {
  comms.sort(function(a, b) {
    return a.timestamp < b.timestamp;
  });
}

export default function GetBlogComments(commentGroup) {

  return function(dispatch) {

    var blogCommentsRef = firebase.database().ref('comments/blog/'+commentGroup).orderByChild('timestamp');
    blogCommentsRef.on('value', function(snapshot) {
      dispatch(getBlogComments(snapshot.val()));
    });

  }
}
