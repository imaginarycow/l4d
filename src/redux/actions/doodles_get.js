import axios from 'axios';

function getDoodles(doodles) {

  //var blog = {};

  //iterate the blogs and return the current blog
  // for (var i in blogs.data) {
  //
  //   if (blogs.data[i].isCurrent == true) {
  //     blog = blogs.data[i];
  //   }
  // }

  return {
    type: 'GET_DOODLES',
    payload: doodles
  }
}

export default function DoodlesLoad() {

  return function(dispatch) {
    axios.get('https://left4dev-b2aab.firebaseio.com/apps/doodles.json')
    .then((response) => {
      dispatch(getDoodles(response.data))
    })
    .catch((error) => {
      console.log(error);
    });

  }
}
