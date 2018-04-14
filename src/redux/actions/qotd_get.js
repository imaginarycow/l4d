import firebase from '../../firebase/firebase.js';
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
    date = '4122018';

    var qotdRef = firebase.database().ref('apps/qotd/'+date);
    qotdRef.on('value', function(snapshot) {
      dispatch(getQuestionOfTheDay(snapshot.val()));
    });

  }
}
