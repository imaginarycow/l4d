const getDoodles = (state = '', action) => {
  switch (action.type) {
    case 'GET_DOODLES':
      return action.payload;
    default:
      return state;
  }
}

export { getDoodles };
