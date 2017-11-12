(() => {

    const hwInput = $('#input1')
    const hwOutputFilter = $('#input2')
    const hwOutputDelay = $('#input3')
    const hwOutputTake3 = $('#input4')
    const stopLoggingButton = $('#stopLogging');

    var input = Rx.Observable.fromEvent(hwInput, 'input')
      .map(event => event.target.value);

    // Filter out target values less than 3 characters long
    input.filter(text => text.length > 2)
      .subscribe(value => hwOutputFilter.val(value)); // "hel"

    // Delay the events
    input.delay(200)
      .subscribe(value => hwOutputDelay.val(value)); // "h" -200ms-> "e" -200ms-> "l" ...

    // Stop the stream of events after 3 events
    input.take(3)
      .subscribe(value => hwOutputTake3.val(value)); // "hel"

    // Passes through events until other observable triggers an event
    var stopStream = Rx.Observable.fromEvent(stopLoggingButton, 'click');
    input.takeUntil(stopStream)
      .subscribe(value => console.log(value)); // "hello" (click)
  }

)();