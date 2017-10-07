import axios from 'axios';

function LoadStoreAction(data) {

  return {
    type: 'LOAD_STORE',
    payload: data
  }
}

export default function LoadStore() {

  return dispatch => {

    return axios.get('https://left4dev-b2aab.firebaseio.com/apps.json')
    .then(response => {
      dispatch(LoadStoreAction(response));
    })
    .catch((error) => {
      throw error
    });

  }

}
