function getFormattedDate() {

  let d = new Date();
  let month = d.getMonth() + 1;
  let stringDate = month + '-' + d.getDate() + '-' + d.getFullYear();

  return stringDate
}

export { getFormattedDate };
