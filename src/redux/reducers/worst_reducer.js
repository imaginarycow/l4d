const getWorstMatchups = (state = '', action) => {
  switch (action.type) {
    case 'GET_WORST_MATCHUPS':
    console.log('blog reducer fired');
      return action.payload;
    default:
      return state;
  }
}

const newWorstMatchup = (state = '', action) => {
  switch (action.type) {
    case 'ADD_WORST_MATCHUP':
      return action.payload;
    default:
      return state;
  }
}

const getWorstComments = (state = '', action) => {
  switch (action.type) {
    case 'GET_WORST_COMMENTS':
    console.log('blog comment reducer fired');
      return action.payload;
    default:
      return state;
  }
}

export {getWorstMatchups, newWorstMatchup, getWorstComments};
