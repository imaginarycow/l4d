export default function LogoutUser() {

  const loggedOutUser = {

    email: 'undefined',
    username: 'undefined',
    image: 'undefined'
  }

  console.log('loggin out user: ' + loggedOutUser);

  return {
    type: 'LOGOUT_USER',
    payload: loggedOutUser
  }

}
