import axios from 'axios';


function getWorstMatchups(matches) {

  console.log(matches);
  //var blog = {dateKey: 1};

  //iterate the blogs and return the current blog
  // for (var i in blogs) {
  //   const tommorrow = getUnformattedDate() + 1;
  //   if (blogs[i].dateKey > blog.dateKey && blogs[i].dateKey < tommorrow) {
  //     blog = blogs[i];
  //   }
  // }

  return {
    type: 'GET_WORST_MATCHUPS',
    payload: matches
  }
}

export default function WorstLoad() {

  return function(dispatch) {
    axios.get('https://left4dev-b2aab.firebaseio.com/apps/worst.json')
    .then((response) => {
      dispatch(getWorstMatchups(response.data))
    })
    .catch((error) => {
      console.log(error);
    });

  }
}
