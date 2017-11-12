class TweetService {
  
  constructor() {
    // Subject is an implementation of an Observable that allows us to manually emit an event via onNext()
    this.updateStream = new Rx.Subject();  
    // The tweetStream fetches new data, everytime the updateStream emits an event
    this.tweetStream = this.updateStream.flatMapLatest(this.fetchData);
  }
  
  // Returns a promise. Only the caller of the function will receive the new data
  getDataPromise() {
    return this.fetchData();
  }
  
  // Every caller of this function gets the same observable and therefore all of the updates
  getDataObservable() {
    return this.tweetStream;
  }

  // Trigger an update for the observable
  updateDataForObservable() {
    // Send an event to the update stream - this will cause the tweetStream to call the server
    this.updateStream.onNext();
  }
  
  // Make an HTTP call to get the data
  // Returns a promise
  fetchData() {
    // We get mock data instead of calling an actual server
    return $.get('mockData.json');
  }
}
