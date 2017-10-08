
const storeLoad= (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_STORE':
      return action.payload.data;
    default:
      return state;
  }
}

const appsFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_SELECTED_APP':
      return action.payload;
    default:
      return state;
  }
}


export {appsFilter, storeLoad};
