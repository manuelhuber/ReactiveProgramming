/*******************************************************************************
 * THIS CODE IS ONLY A REFERENCE. THE CHAT SERVER DOESN'T ACTUALLY RUN IN YOUR
 * BROWSER. CHANING CODE HERE WON'T DO ANYTHING AT ALL.
 ******************************************************************************/

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const allConnections = {};
const currentlyTyping = [];

io.on('connection', function (socket) {
    const name = socket.request._query['name'];
    allConnections[name] = socket;
    emitUsers();
    console.log(name + ' connected');

    socket.on('disconnect', function () {
        console.log(name + ' disconnected');
        delete allConnections[name];
        emitUsers();
    });

    socket.on('chat message', function (msg) {
        const message = name + ': ' + msg;
        console.log(message);
        io.emit('chat message', message);
    });

    socket.on('start typing', function () {
        if (currentlyTyping.indexOf(name) !== -1) return;
        currentlyTyping.push(name);
        emitTyping();
    });

    socket.on('stop typing', function () {
        if (currentlyTyping.indexOf(name) === -1) return;
        currentlyTyping.splice(currentlyTyping.indexOf(name), 1);
        emitTyping();
    });

    socket.on('pm', function (pm) {
        if (!pm || !allConnections[pm.to] || pm.to === name) return;
        console.log(`${name} to ${pm.to}: ${pm.message}`);
        let id = allConnections[pm.to].id;
        pm.from = name;
        socket.to(id).emit('pm', pm);
        socket.emit('pm', pm);
    });

    function emitTyping() {
        io.emit('typing', currentlyTyping);
    }

    function emitUsers() {
        io.emit('all users', Object.keys(allConnections));
    }
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
