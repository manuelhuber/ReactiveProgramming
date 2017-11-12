(() => {

  // --- UI Stuff, NO NEED TO TOUCH THESE --- //
  const wordField = $('#TotDWord');
const inputField = $('#TotDInput');
const scoreField = $('#TotDScore');
  // ----------------------------------------- //

  /**
   * TODO: create a stream from the input field, that returns the user's input as string
   * Hint: See the Wikipedia example
   */
  // const inputFieldStream = ???;


  // Uncomment this line to see if you have the input right
  // inputFieldStream.subscribe(x => console.log(x));
  
  
  // This stream is used to reset the input stream
  const manualInputStream = new Rx.Subject();

  /**
   * TODO: Merge the input field stream and our manual stream - this stream should emit events from both streams.
   */
  // const inputStream = ??? ;

  // A stream that allows us to manually trigger that we need a new word
  const nextStream = new Rx.Subject();

  /**
   * TODO: Complete the statement below to create a stream that emits a random word everytime the nextStream emits an event.
   * The .startWith() is needed to load the first word
   * Look at the Wikipedia example on how to handle a function that returns a promise. Use the "getRandomWord" function defined at the end of this file.
   * Call ".publish().refCount()" after the map function to cache the result and avoid multiple server calls
   */
  // const wordStream = nextStream.startWith('').???;

  /**
   * TODO: Uncomment this code when you have the word stream
   * A random word should be displayed above the input box then.
   * If there is none, check the wordStream or ask for help.
  
  // When there is a new word, we display it
  wordStream.subscribe(word => {
    wordField.empty();
    wordField.append(word);
  });
  
  */

  /**
   * TODO: combine the wordstream and the input stream.
   * Every time either of those stream emits a value this stream should emit a tuple with the latest values of both streams.
   * The tuple need to look like this: ['the word', 'the user input']
   */
  // const checkStream = ???;
  
 
   // Uncomment this code to see if the output of the checkStream looks like it's supposed to:
   // checkStream.subscribe(x => console.log(x));

  /**
   * TODO: Map the checkStream to a stream of booleans. When the current word doesn't start the user's input emit false otherwise true.
   * Hint: 
   * You can access the values of tuples with the index notation "myTupleVariableName[0]" and "myTupleVariableName[1]"
   * strings offer a ".startsWith(x)" function.
   */
  // const isCorrectStream = ???;

  /**
   * TODO: Uncomment when you created the isCorrectStream
   * After this, the input field should empty, when you enter a wrong letter and a new word should appear
   * If no new word appears check your wordStream or ask for help
  
  isCorrectStream.subscribe(isCorrect => {
    if (!isCorrect) {
      reset();
      scoreField.empty();
    }
  });
  
  */

  /**
   * TODO: Create a stream that emits an event every time the user has entered the entire word correctly.
   */
  // const wordCompletedStream = ???;

  /**
   * TODO: Uncomment this when you have the wordCompletedStream
   * Below the input field there should now be your score (you need to type at least 1 word correctly to see it)
   
  // Add a score and reset, when the wordCompletedStream fires
  wordCompletedStream.subscribe(() => {
    scoreField.append('I')
    reset();
  })

  */
  
  /**
   * YOURE DONE!
   * Make sure all of the following are correct:
   * There's a word at the start.
   * When you type a word correctly the input field empties, a new word is generated and you get one point
   * When you make a typo the input field empties, a new word is generated and you lose all points
   */

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