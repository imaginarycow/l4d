export function validateEmail(email) {

//unacceptable chars
const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

  return true;
}

export function validatePassword(pass) {

  return true;
}

export function validateString(text) {
  //1. Validate only good characters
  //unacceptable chars
  const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
  if (pattern.test(text)) {
    return false;
  }

  return true;
}
