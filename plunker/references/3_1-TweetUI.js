// This class renders our tweets
class TweetDisplayer {
  
  constructor(tweetService) {
    this.service = tweetService;
    this.service.getDataObservable()
    .subscribe(tweets => {
      const data = 'At ' + new Date().toLocaleTimeString() + ' Trump tweeted something stupid!';
      render(data, 'tweetService');
    });

    // Creates a button that calls the update function on click
    createTweetUiButton('Update from the displayer class', () => this.update());
  }

  update() {
    this.service.updateDataForObservable();
  }
}

// This is some other class that can also trigger an update for Tweets - and the TweetDisplayer needs to react to these aswell
class AnotherClass {
  constructor(tweetService) {
    this.service = tweetService;
    // Creates a button that calls the update function on click
    createTweetUiButton('Update from another class', () => this.update());
  }

  update() {
    this.service.updateDataForObservable();
  }
}

function createTweetUiButton(text, onClick) {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.onclick = onClick;
  renderHtml(button, 'tweetService');
}