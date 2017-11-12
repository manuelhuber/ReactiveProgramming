(() => {

  // --- UI Stuff, NO NEED TO TOUCH THESE --- //
  const wordField = $('#TotDWord');
  const inputField = $('#TotDInput');
  const scoreField = $('#TotDScore');
  // ----------------------------------------- //

  // A stream of the users string inputs
  const inputFieldStream = Rx.Observable.fromEvent(inputField, 'keyup')
    .map(x => x.target.value).distinctUntilChanged();

  // This stream is used to reset the input stream
  const manualInputStream = new Rx.Subject();

  // Merge the input field stream and our manual stream
  const inputStream = inputFieldStream.merge(manualInputStream);

  // A stream that allows us to manually trigger that we need a new word
  const nextStream = new Rx.Subject();

  // This stream calls a server for a new random word every time the nextStream emits an event. We startWith a value to trigger the first word
  const wordStream = nextStream.startWith('')
  .flatMapLatest(getRandomWord)
    // publish & refCount cache the result - otherwise every .map on wordStream would cause a new HTTP request
    .publish().refCount();

  // When there is a new word, we display it
  wordStream.subscribe(word => {
    wordField.empty();
    wordField.append(word);
  });

  // Checkstream combines the latest word with the latest userinput. It emits an array, like this ['the word', 'the user input'];
  const checkStream = wordStream.combineLatest(inputStream);

  // Emits false if the user input is not correct
  const isCorrectStream = checkStream.map(tuple => {
    const word = tuple[0];
    const input = tuple[1];
    return word.startsWith(input);
  });

  isCorrectStream.subscribe(isCorrect => {
    if (!isCorrect) {
      reset();
      scoreField.empty();
    }
  });

  // Emits an event when the user has entered the entire word correctly
  const wordCompletedStream = checkStream.filter(tuple => {
    const word = tuple[0];
    const input = tuple[1];
    return word == input;
  });

  // Add a score and reset, when the wordCompletedStream fires
  wordCompletedStream.subscribe(() => {
    scoreField.append('I')
    reset();
  })

  // Resets the user input and requests a new word
  function reset() {
    inputField.value = '';
    manualInputStream.onNext('');
    nextStream.onNext();
  }

  // Calls a server for a random word
  // returns a promise
  function getRandomWord() {
    return $.ajax({
      // Change the URL to cause a 404 error
      url: 'http://setgetgo.com/randomword/get.php'
    }).promise();
  }
})();