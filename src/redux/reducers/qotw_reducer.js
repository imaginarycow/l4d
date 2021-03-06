
const getQotw = (state = null, action) => {
  switch (action.type) {
    case 'GET_QOTD':
      return action.payload;
    default:
      return state;
  }
}

const newQotd = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_QOTD':
      return action.payload;
    default:
      return state;
  }
}

const getQotdComments = (state = null, action) => {
  switch (action.type) {
    case 'GET_QOTD_COMMENTS':
      return action.payload;
    default:
      return state;
  }
}


export {getQotw, newQotd, getQotdComments};
