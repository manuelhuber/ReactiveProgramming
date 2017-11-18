/*******************************************************************************
 * Recommended order:
 * Send/receive message
 * Display current users
 * "Is Typing"
 * Send/receive PM (private message)
 ******************************************************************************/ 


(() => {
  // ----- UI Elements -----
  const loginButton = $('#chatLoginButton');
  const usernameInput = $('#chatUsername');
  const messages = $('#chatMessages');
  const input = $('#chatInput');
  const form = $('#chatForm');
  const messageInput = $('#chatInput');
  // Box to display who's currently typing
  const currentlyTyping = $('#chatCurrentlyTyping');
  // Box to display all current users
  const allUsers = $('#chatAllUsers');

  var username;

  // ----- Login ---------------------------------------------------------------
  loginButton.click(() => {
    username = usernameInput.val();
    if (!username) {
      alert('Please enter a username');
      return;
    }
    if(username.indexOf(' ') !== -1){
      alert('No spaces allowed in the username');
      return;
    }
    connect(username);
    loginButton.prop('disabled', true);
    usernameInput.prop('disabled', true);
    $('#chatSendButton').prop('disabled', false);
  });

  // ----- Chat ----------------------------------------------------------------
  function connect(username) {

    // ----- Connect to the server ----- 
    var socket = io.connect('http://141.60.170.61:3000', {
      transports: ['websocket'],
      query: 'name=' + username
    });

    // ----- Send message -----
    form.submit(() => {
      const message = input.val();
      if (!message) return false;
      
      /**
       * TODO: Send Message
       * Look at the ChatServer code to see how socket.io works.
       * You will use socket.emit(...) and socket.on(...) to interact with the server
       * Check the server API file in this plunker for infos
       */
       
      /**
       * TODO: Send PMs
       * Use the isPM function to check if a string conforms to the PM syntax
       * Use the createPM function to turn the user input string to an PM object
       */
       
      input.val('');
      return false;
    });

    // ----- Receive message ----- 
    /**
     * TODO
     * Use the renderMessage function to display them
     */

    // ----- Receive PM -----
    /**
     * TODO
     * Use the pmToMe and pmFromMe functions to render the PMs
     * Check the Server API for infos on the data model
     */

    // ----- "Is Typing" ----- 
    /**
     * TODO
     * Send a signal, when you are typing (don't worry about sending the same signal multiple times)
     * Send a signal, when you haven't typed anything for 3 seconds
     * Use the renderIsTyping function to display the names
     */

    // ----- Display current users -----
    /**
     * TODO
     * Use the renderUsers function to display the names
     */
  }
 // ----- Render functions ----------------------------------------------------

  // Renders an array of names of people who are typing
  function renderIsTyping(names) {
    currentlyTyping.empty();
    if (!names.length) return;
    currentlyTyping.append(names.join(', ') + ' is typing...');
  }

  // Renders an array of names in the all users section
  function renderUsers(users) {
    allUsers.empty();
    allUsers.append(users.join('<br>'))
  }

  // Render a string in the message box
  function renderMessage(msg) {
    render(msg, 'chatMessages')
    var foo = document.getElementById('chatMessages');
    foo.scrollTop = foo.scrollHeight;
  }

  // Render a PM object sent from someone to me
  function pmToMe(msg) {
    renderMessage(`From ${msg.from}: ${msg.message}`);
  }
  
  // Render a PM object sent from me to someone 
  function pmFromMe(msg) {
    renderMessage(`to ${msg.to}: ${msg.message}`);
  }

  // ----- Regex functions -----------------------------------------------------

  //  PMs look like this
  // "/pm" + username (no spaces) + message
  // "/pm Manuel Hey man, what's up?"
  const pmRegex = /\/pm\s+(\w+)\s+(.*)/;

  // returns true if the name is a PM.
  function isPM(s) {
    return s.match(pmRegex);
  }

  // Creates a PM object from a string that isPM()
  // Returns a object with a "to" and "message" property (which is what the server expects)
  function createPM(s) {
    const captureGroups = s.match(pmRegex);
    return {
      to: captureGroups[1],
      message: captureGroups[2]
    };
  }

})();