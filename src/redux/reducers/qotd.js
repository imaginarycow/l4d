
const qotd = (state = {}, action) => {
  switch (action.type) {
    case 'SET_QOTD':
    console.log("set qotd reducer fired");
      return action.payload;
    default:
      return state;
  }
}


export default qotd;
