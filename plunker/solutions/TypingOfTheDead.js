(() => {

  // --- UI Stuff, NO NEED TO TOUCH THESE --- //
  const wordField = $('#TotDWord');
  const inputField = $('#TotDInput');
  const scoreField = $('#TotDScore');
  const highscoreField = $('#TotDHighscore');
  // ----------------------------------------- //

  let score = 0;
  let highscore = -1;

  // A stream of the users string inputs
  const inputStream = Rx.Observable.fromEvent(inputField, 'input')
    .map(x => x.target.value);

  // A stream that allows us to manually trigger that we need a new word
  const nextStream = new Rx.Subject();

  // When we want the next word we need to reset the users input
  nextStream.subscribe(() => inputField.val('').trigger('input'));

  // This stream calls a server for a new random word every time the nextStream emits an event. We startWith a value to trigger the first word
  const wordStream = nextStream.startWith('')
    .flatMapLatest(getRandomWord)
    // share() to cache the result - otherwise every .map on wordStream would cause a new HTTP request (and therefore another random word)
    .share();

  // When there is a new word, we display it
  wordStream.subscribe(word => {
    wordField.empty();
    wordField.append(word);
  });

  // Checkstream combines the latest word with the latest userinput. It emits an array, like this ['the word', 'the user input'];
  // The share() is to make sure everybody receives the same data tuple (like the wordStream caching)
  const checkStream = wordStream.combineLatest(inputStream).share();

  // Emits an event if the user input is not correct
  const typoStream = checkStream.map(tuple => {
      const word = tuple[0];
      const input = tuple[1];
      return word.startsWith(input);
    })
    .filter(x => !x);

  // When there is a typo we need a new word
  typoStream.subscribe(nextStream);
  // This is a short version for
  // typoStream.subscribe(x => nextStream.onNext(x));

  // Emits an event when the user has entered the entire word correctly
  const wordCompletedStream = checkStream.filter(tuple => {
    const word = tuple[0];
    const input = tuple[1];
    return word == input;
  });

  typoStream.subscribe(x => console.log('wont get executed'));
  // Whenever the word is completed, request a new word
  wordCompletedStream.subscribe(nextStream);
  typoStream.subscribe(x => console.log('will get executed'));

  // When this stream emits "true" increase the score, when it emits "false" reset to zero
  const scoreUpdateStream = new Rx.Subject();

  scoreUpdateStream.subscribe(increase => {
    const newScore = increase ? ++score : 0;
    score = newScore;
  });

  const scoreStream = scoreUpdateStream.map(increase => score).startWith(0);

  scoreStream.subscribe(num => {
    scoreField.empty();
    scoreField.append(num);
  });

  typoStream.subscribe(() => scoreUpdateStream.onNext(false));
  wordCompletedStream.subscribe(() => scoreUpdateStream.onNext(true))

  const highscoreStream = scoreStream.filter(x => x > highscore);

  highscoreStream.subscribe(num => {
    highscore = num;
    highscoreField.empty()
    highscoreField.append(num);
  });

  // Calls a server for a random word
  // returns a promise
  function getRandomWord() {
    return $.ajax({
      // Change the URL to cause a 404 error
      url: 'http://setgetgo.com/randomword/get.php'
    }).promise();
  }
})();