
const lastPage = (state = 'Home', action) => {
  switch (action.type) {
    case 'LAST_PAGE':
      return action.payload;
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


export {appsFilter, lastPage};
