const getBlog = (state = '', action) => {
  switch (action.type) {
    case 'GET_BLOG':
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

const getBlogComments = (state = null, action) => {
  switch (action.type) {
    case 'GET_BLOG_COMMENTS':
      return action.payload;
    default:
      return state;
  }
}

export {getBlog, newBlog, getBlogComments};
