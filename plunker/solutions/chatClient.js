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

  // ----- Login ---------------------------------------------------------------
  loginButton.click(() => {
    const username = usernameInput.val();
    if (!username) {
      alert('Please enter a username');
      return;
    }
    if (username.indexOf(' ') !== -1) {
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
    form.submit((e) => {
      const message = input.val();
      if (!message) return false;
      if (isPM(message)) {
        socket.emit('pm', createPM(message));
      } else {
        socket.emit('chat message', message);
      }
      input.val('');
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    // ----- Receive message ----- 
    socket.on('chat message', renderMessage);
    
    // ----- Receive PM -----
    socket.on('pm', pm => {
      if(pm.from === username) pmFromMe(pm)
      else pmToMe(pm)
    });

    // ----- "Is Typing" ----- 
    const inputStream = Rx.Observable.fromEvent(messageInput, 'keyup')
      .map(x => x.target.value);
    inputStream.subscribe(x => socket.emit('start typing'));
    inputStream.buffer(inputStream.debounce(3000))
      .subscribe(x => socket.emit('stop typing'));
    socket.on('typing', renderIsTyping);

    // ----- Display current users -----
    socket.on('all users', renderUsers);
  }

   // ----- Render functions ----------------------------------------------------

  function renderIsTyping(names) {
    currentlyTyping.empty();
    if (!names.length) return;
    currentlyTyping.append(names.join(', ') + ' is typing...');
  }

  function renderUsers(users) {
    allUsers.empty();
    allUsers.append(users.join('<br>'))
  }

  function renderMessage(msg) {
    render(msg, 'chatMessages')
    var foo = document.getElementById('chatMessages');
    foo.scrollTop = foo.scrollHeight;
  }

  function pmToMe(msg) {
    renderMessage(`From ${msg.from}: ${msg.message}`);
  }

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