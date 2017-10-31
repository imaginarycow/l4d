import axios from 'axios';

export default function createUser(user) {

  return {
    type: 'CREATE_USER',
    payload: user
  }
}

// export default function CreateNewUser() {
//
//   return function(dispatch) {
//     axios.POST('https://left4dev-b2aab.firebaseio.com/apps/Blog.json')
//     .then((response) => {
//       dispatch(createUser(response))
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//
//   }
// }
