import axios from 'axios';
import { getUnformattedDate } from '../../utils/dates';

function getQuestionOfTheDay(question) {

  return {
    type: 'GET_QOTD',
    payload: question
  }
}

export default function QotdLoad() {

  return function(dispatch) {

    let date = getUnformattedDate();

    axios.get('https://left4dev-b2aab.firebaseio.com/apps/qotd/' + date + '.json')
    .then((response) =>
      dispatch(getQuestionOfTheDay(response.data))
    )
    .catch((error) => {
      console.log(error);
    });

  }
}
