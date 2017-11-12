(() => {
  
const multiButton = $('#multiclickButton');

const clickStream = Rx.Observable.fromEvent(multiButton, 'click');

const multiClicks = clickStream
  .buffer(clickStream.debounce(250))
  .map(x => x.length)
  .filter(x => x>=2);

const messageBox = createElement('multiclick');

multiClicks.subscribe(x => {
  messageBox.empty();
  messageBox.append( x + ' Clicks!');
});

})();