import axios from 'axios';

function getQuestionOfTheDay(question) {
  console.log("action");
  return {
    type: 'GET_QOTD',
    payload: question
  }
}

export function QOTD() {

  return function(dispatch) {

    axios.get('https://left4dev-b2aab.firebaseio.com/questions.json')
    .then((response) =>
      dispatch(getQuestionOfTheDay(response))
    )
    .catch((error) => {
      console.log(error);
    });

  }
}
