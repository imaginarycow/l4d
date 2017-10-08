const loginUser = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.payload;
    default:
      return state;
  }
}

const createUser = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return action.payload;
    default:
      return state;
  }
}


export {loginUser, createUser};
