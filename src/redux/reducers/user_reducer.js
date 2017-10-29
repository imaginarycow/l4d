const loginUser = (state = {email: 'undefined'}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
    console.log('inside user reducer'+action.payload);
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
