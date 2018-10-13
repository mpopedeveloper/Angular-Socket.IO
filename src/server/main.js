let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const mongoose = require('mongoose');
const MONGO_URI = "mongodb://localhost:27017/socket-products-test";
    mongoose.connect(MONGO_URI, {useNewUrlParser: true})
    .then(() =>  console.log("connected to MongoDB"))
    .catch(() => console.log("There was an error"));



let clients = 0;
io.on('connection', (socket) => {
    clients++;
    io.emit("client connected", { clients })
    console.log('user connected');
    socket.on('disconnect', (data) => {
        clients--;
        io.emit('client disconnected', { clients });
    })

    socket.on('message', (message) => {
        console.log('Message Recieved: ' + message);
        io.emit('message', { type: 'new-message', text: message });
    });

    socket.on('event', (data) => {
        console.log('event');
        io.emit('event', { payload: "data from server!" });
    });
    socket.on('join room1', (data) => {
        socket.join('room1');
        io.to('room1').emit('joined room1', { payload: "You joined room 1!" })
    });
    socket.on('join room2', (data) => {
        socket.join('room2');
        io.to('room2').emit('joined room2', { payload: "You joined room 2!" })
    });
    socket.on('join room3', (data) => {
        socket.join('room3');
        io.to('room3').emit('joined room3', { payload: "You joined room 3!" })
    });


    // socket.on('client connected', (data) => {
    //     clients++;
    //     io.emit("client connected response", { clients })
    // })
});


// app.get('/', (req, res) => {
//     res.send("Home Page!");
// })

http.listen(5000, () => {
    console.log('started on port 5000');
});