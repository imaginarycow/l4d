
const qotd = (state = {}, action) => {
  console.log('qotd reducer fired');
  switch (action.type) {
    case 'SET_QOTD':
    console.log("set qotd reducer fired");
      return action.payload;
    default:
      return state;
  }
}


export default qotd;
