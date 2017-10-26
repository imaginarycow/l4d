
const getQotd = (state = {}, action) => {
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

const getQotdComments = (state = {}, action) => {
  switch (action.type) {
    case 'GET_QOTD_COMMENTS':
      return action.payload;
    default:
      return state;
  }
}


export {getQotd, newQotd, getQotdComments};
