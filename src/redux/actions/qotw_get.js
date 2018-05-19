import axios from 'axios';
import firebase from 'firebase';
import { getUnformattedDate } from '../../utils/dates';

function getQuestionOfTheWeek(question) {
  
  for (var i in question) {
    question = question[i];
  }
  return {
    type: 'GET_QOTD',
    payload: question
  }
}

export default function QotwLoad() {

  return function(dispatch) {

    var qotwRef = firebase.database().ref('apps/qotw').orderByChild('active').equalTo(true);
      qotwRef.on('value', function(snapshot) {
      dispatch(getQuestionOfTheWeek(snapshot.val()));
    });

  }
}
