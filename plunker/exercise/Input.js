(() => {

    // ----- UI Elements -----
    const hwInput = $('#input1')
    const hwOutputFilter = $('#input2')
    const hwOutputDelay = $('#input3')
    const hwOutputTake3 = $('#input4')
    const stopLoggingButton = $('#stopLogging');
    const hwOutputStop = $('#input5');


    var input = Rx.Observable.fromEvent(hwInput, 'input')
      .map(event => event.target.value);

    //TODO Filter the input and show only characters that are longer than 3 characters

    // use to display .subscribe(value => hwOutputFilter.val(value)); 

    //TODO Delay the events  by 200ms

    // use to display .subscribe(value => hwOutputDelay.val(value)); 

    // TODO Stop the stream of events after 3 events

    // use to display  .subscribe(value => hwOutputTake3.val(value)); 

    /*TODO create a new observable based on the stop button, 
    when the button is clicked, the output into hwOutputStop should end
    */

    // use to display    .subscribe(value => hwOutputStop.val(value)); 

  }


)();