
const appsFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_SELECTED_APP':
      return action.payload;
    default:
      return state;
  }
}


export default appsFilter;
