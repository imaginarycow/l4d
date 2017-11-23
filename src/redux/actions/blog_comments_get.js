import firebase from '../../firebase/firebase.js';

function getBlogComments(comms) {

  var sortedComms = [];
  for (var i in comms) {
    sortedComms.push(comms[i]);
  }
  sortedComms.sort(function(a, b){return a.timestamp - b.timestamp});

  return {
    type: 'GET_BLOG_COMMENTS',
    payload: sortedComms
  }
}

export default function GetBlogComments(commentGroup) {

  return function(dispatch) {

    var blogCommentsRef = firebase.database().ref('comments/blog/'+commentGroup);
    blogCommentsRef.on('value', function(snapshot) {
      dispatch(getBlogComments(snapshot.val()));
    });

  }
}
