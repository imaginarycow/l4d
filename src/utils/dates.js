function getFormattedDate() {

  let d = new Date();
  let month = d.getMonth() + 1;
  let stringDate = month + '-' + d.getDate() + '-' + d.getFullYear();

  return stringDate
}

function getUnformattedDate(date) {

  if (date === null || typeof date === 'undefined') {
    let d = new Date();
    let month = d.getMonth() + 1;
    let stringDate = month + '' + d.getDate() + '' + d.getFullYear();

    return stringDate
  }
  else {
    return date.replace(/\-/g,'');
  }


}

export { getUnformattedDate, getFormattedDate };
