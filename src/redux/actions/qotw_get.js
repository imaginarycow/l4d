import axios from 'axios';
import { getUnformattedDate } from '../../utils/dates';

function getQuestionOfTheDay(question) {
console.log(question);
  return {
    type: 'GET_QOTD',
    payload: question
  }
}

export default function QotdLoad() {

  return function(dispatch) {

    let url = 'https://left4dev-b2aab.firebaseio.com/apps/qotw.json?active=true';
    axios.get(url)
    .then(response => {
      let data = response.data;
      for (let i in data) {
        dispatch(getQuestionOfTheDay(data[i]));
      }
      
    })

  }
}
