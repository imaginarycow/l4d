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
    return date.replace(/-/g,'');
  }
}

function getCommentDate(date) {

  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  const month = monthNames[monthIndex];
  var year = date.getFullYear();
  const rawMin = date.getMinutes();
  const min = rawMin > 9 ? rawMin : '0'+rawMin;
  const rawHours = date.getHours();
  const hours = rawHours > 12 ? rawHours - 12 : rawHours;
  var isPM = rawHours > 11 ? 'PM' : 'AM';

  if (rawHours === 24) {
    isPM = 'AM';
  }

  return month + ' ' + day + ', ' + year
          + ' ' + hours + ":" + min + ' ' + isPM;

}

export { getUnformattedDate, getFormattedDate, getCommentDate };
