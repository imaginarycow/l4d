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

const getBlogComments = (state = null, action) => {
  switch (action.type) {
    case 'GET_BLOG_COMMENTS':
    console.log('blog comment reducer fired');
      return action.payload;
    default:
      return state;
  }
}

export {getBlog, newBlog, getBlogComments};
