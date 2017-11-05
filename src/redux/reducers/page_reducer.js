const setLastPage = (state = {page: 'Home', link: '/'}, action) => {
  switch (action.type) {
    case 'SET_LAST_PAGE':
      return action.payload;
    default:
      return state;
  }
}


export {setLastPage};
