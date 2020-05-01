export const validate = (_text: string) => {
  const text = _text.trim();
  const punctuation = /[.,\/#!$%\^&\*;:{}=\-_`~()']/g;
  const word = /\w+/g;
  // allow for ' at start and end of word for effect, such as 
  // 'ole and startin'
  const invalidEndPunc = /[.,\/#!$%\^&\*;:{}=\-_`~()]$/g;
  const invalidStartPunc = /^[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
  if (text === '')
    return 'Cannot be empty!';
  if (text.split(' ').length > 1)
    return 'You can only add one word at a time!';
  if (punctuation.test(text) && word.test(text)) {
    if (invalidEndPunc.test(text) || invalidStartPunc.test(text)) {
      return 'Punctuation counts as a word!';
    }
  }
  return true;
};