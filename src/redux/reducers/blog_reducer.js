const getBlog = (state = '', action) => {
  switch (action.type) {
    case 'GET_BLOG':
    console.log('blog reducer fired');
      return action.payload;
    default:
      return state;
  }
}

const newBlog = (state = '', action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return action.payload;
    default:
      return state;
  }
}


export {getBlog, newBlog};
