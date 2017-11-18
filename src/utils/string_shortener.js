export default function shortenString(rawText, newLength) {
  var newText = '';
  if (rawText.length > newLength) {
    newText = rawText.substring(0, newLength - 3) + '...';
  }
  else {
    return rawText;
  }

  return newText;
}
