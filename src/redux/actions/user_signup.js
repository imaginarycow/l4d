import axios from 'axios';

export default function createUser(user) {

  return {
    type: 'CREATE_USER',
    payload: user
  }
}

