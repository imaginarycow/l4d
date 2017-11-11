export function validateEmail(email) {

//unacceptable chars
const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

  //1. Validate good email


  //2. Validate email not already signed up

  console.log('test email validation on: ' + email);
  return true;
}

export function validatePassword(pass) {
  //1. Validate only good characters


  //2. Validate correct length
  console.log('test password validation on: ' + pass);
  return true;
}

export function validateString(text) {
  //1. Validate only good characters
  //unacceptable chars
  const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
  if (pattern.test(text)) {
    return false;
  }
  //2. Validate correct length
  console.log('test password validation on: ' + text);
  return true;
}
