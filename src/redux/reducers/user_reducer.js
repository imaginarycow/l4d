const loginUser = (state = {email: 'undefined'}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.payload;
    case 'LOGOUT_USER':
    console.log('in logout user reducer ' + action.payload);
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
