(() => {

  // --- UI Stuff, NO NEED TO TOUCH THESE --- //
  const wordField = $('#TotDWord');
  const inputField = $('#TotDInput');
  const scoreField = $('#TotDScore');
  const highscoreField = $('#TotDHighscore');
  // ----------------------------------------- //

  let score = 0;
  let highscore = 0;

  /**
   * TODO: create a stream from the input field, that returns the user's input as string
   * Hint: See the Wikipedia example
   */
  // const inputStream = ???

  // A stream that allows us to manually trigger that we need a new word
  // To make a Subject emit a new value call .onNext() function with the value (or nothing) as parameter.
  // Example: nextStream.onNext()
  const nextStream = new Rx.Subject();

  // When we want a new word we need to reset the users input
  nextStream.subscribe(() => {
    // Setting the value doesn't trigger a change event
    inputField.val('');
    // so we need to manually trigger the event
    inputField.trigger('input');
  });

  /**
   * TODO: Complete the statement below to create a stream that emits a random word everytime the nextStream emits an event.
   * The .startWith() is needed to load the first word
   * Look at the Wikipedia example on how to handle a function that returns a promise. Use the "getRandomWord" function defined at the end of this file.
   * Call ".share()" after the map function to cache the result and avoid multiple server calls
   */
  // const wordStream = nextStream.startWith('').???

  /**
   * TODO: Uncomment this code when you have the word stream
   * A random word should be displayed above the input box then.
   * If there is none, check the wordStream or ask for help.
   */

  // When there is a new word, we display it
  // wordStream.subscribe(word => {
  //   wordField.empty();
  //   wordField.append(word);
  // });

  /**
   * TODO: combine the latest values from wordStream and the inputStream.
   * Every time either of those stream emits a value this stream should emit a tuple with the latest values of both streams.
   * The tuple need to look like this: ['the word', 'the user input']
   * Call .share() after combining the stream to make sure every subscriber receives the same values - this is a bit more advanced so ask for help if you want to know why
   */
  // const checkStream = ???;


  // Uncomment this code to see if the output of the checkStream looks like it's supposed to:
  // If the word in the console doesn't match the word on the page you missed the caching in the wordStream!
  // checkStream.subscribe(x => console.log(x));


  /**
   * TODO: Create a typoStream that emits an event everytime the user makes a mistake
   * Hint: 
   * You can access the values of tuples with the index notation "myTupleVariableName[0]" and "myTupleVariableName[1]"
   * strings offer a ".startsWith(x)" function.
   */
  // const typoStream = ???

  /** 
   * TODO: Feed the typoStream into the nextStream
   * Now every typo should cause your input to reset & a new word to appear
   */

  /**
   * TODO: Create a stream that emits an event every time the user has entered the entire word correctly.
   */
  // const wordCompletedStream = ???

  /**
   * TODO: Feed the wordCompleteStream into the nextStream
   * Hint: Check the comment above the nextStream to learn how to make the stream emit a value
   * Now every time you complete a word it should cause your input to reset & a new word to appear
   */

  // When this stream emits "true" increase the score, when it emits "false" reset to zero
  const scoreUpdateStream = new Rx.Subject();
  
  // Increase or reset score - depending on the update sent
  scoreUpdateStream.subscribe(increase => score = increase ? score + 1 : 0);

  /**
   * TODO: Create the score stream that emits the current score whenever there is a score update.
   * If the scoreUpdateStream emits false set the score to zero
   * If the scoreUpdateStream emits true increase the score by 1
   * Use the variable "score" to persist the current score.
   * Make the scoreStream startWith (= emit from the beginngin) a value of 0
   */
  // const scoreStream = ???

  /**
   * TODO: Uncomment once you have the scoreStream
   */
  //scoreStream.subscribe(num => {
  //  scoreField.empty();
  //  scoreField.append(num);
  //});
  
  /**
   * TODO: Update the score
   * On a typo, reset the score
   * On a completed word increase the score
   * Hint: send values to the scoreUpdateStream
   */
  
  /**
   * TODO: Create a highscoreStream that emits the new highscore everytime the old one has been broken
   * Hint: just assume the current highscore is in the "highscore" variable - we will fill it later
   */
  // const highscoreStream = ???

  /**
   * TODO: Uncomment once you have the highscoreStream
   * Now you should have a working highscore field next to the input field
   */
  //highscoreStream.subscribe(num => {
  //  highscore = num;
  //  highscoreField.empty()
  //  highscoreField.append(num);
  //});

  /**
   * YOURE DONE!
   * Make sure all of the following are correct:
   * There's a word at the start.
   * When you type a word correctly the input field empties, a new word is generated and you get one point
   * When you make a typo the input field empties, a new word is generated and you lose all points
   * Your highscore is updated every time you have a new highscore
   */

  // Calls a server for a random word
  // returns a promise
  function getRandomWord() {
    return $.ajax({
      // Change the URL to cause a 404 error
      url: 'http://setgetgo.com/randomword/get.php'
    }).promise();
  }
})();