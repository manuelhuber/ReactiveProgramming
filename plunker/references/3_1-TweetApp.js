(() => {
  
  // Create the service, displayer and another class. It's important that all UI elements get the same instance of the service!
  const service = new TweetService();
  const displayer = new TweetDisplayer(service);
  const otherThing = new AnotherClass(service);

})();