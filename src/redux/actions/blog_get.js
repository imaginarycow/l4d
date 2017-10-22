import axios from 'axios';
import { getUnformattedDate } from '../../utils/dates';

function getTodaysBlog(blogs) {

  var blog = {dateKey: 1};

  //iterate the blogs and return the current blog
  for (var i in blogs) {
    const tommorrow = getUnformattedDate() + 1;
    if (blogs[i].dateKey > blog.dateKey && blogs[i].dateKey < tommorrow) {
      blog = blogs[i];
    }
  }

  return {
    type: 'GET_BLOG',
    payload: blog
  }
}

export default function BlogLoad() {

  return function(dispatch) {
    axios.get('https://left4dev-b2aab.firebaseio.com/apps/blog.json')
    .then((response) => {
      dispatch(getTodaysBlog(response.data))
    })
    .catch((error) => {
      console.log(error);
    });

  }
}
