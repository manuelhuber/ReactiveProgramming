(() => {
  
  const myInputField = $('#wikipediaInput');
  const suggestionBox = $('#wikipediaOutput');

  const inputs = Rx.Observable.fromEvent(myInputField, 'input')
    .map(e => e.target.value);

  const newSearchTerm = inputs
    .filter(text => text.length > 2)
    .throttle(500);

  newSearchTerm.flatMapLatest(searchWikipedia)
    .subscribe(renderData, renderError);

  // Queries the wikipedia servers
  // returns a promise
  function searchWikipedia(term) {
    return $.ajax({
      // Change the URL to cause a 404 error
      url: 'https://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'opensearch',
        format: 'json',
        search: term
      }
    }).promise();
  }

  // ------------- RENDER FUNCTIONS ------------------
  // A function that displays the data in the UI - no need to know how it works
  function renderData(data) {
    var res = data[1];
    suggestionBox.empty();
    $.each(res, (_, value) => $('<li>' + value + '</li>').appendTo(suggestionBox));
  }

  function renderError(error) {
    suggestionBox.empty();
    $('<li>Error: ' + error.status + '</li>').appendTo(suggestionBox);
  }
  
})();