export default function LogoutUser() {

  const loggedOutUser = {

    email: 'undefined',
    username: 'undefined',
    image: 'undefined'
  }

  return {
    type: 'LOGOUT_USER',
    payload: loggedOutUser
  }

}
