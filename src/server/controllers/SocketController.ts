import * as socketIo from 'socket.io';
import { ProductController } from './ProductController';
import { TwitterAPIController } from './TwitterController';

export class SocketController {
    private Twitter = new TwitterAPIController;

    public connect(server: any) {
        const io = socketIo(server);

/**The following funcions emit events to the server */
        let clients = 0;
        io.on('connection', (socket) => {
            /**Use the setInterval function below to test emiting to a specific
             * socket id even on Angular navigation change.
             */
            // const sendUpdate = () => {
            //     io.to(`${socket.id}`).emit('socket', `Messaged to ${socket.id} from server...`);
            // };
            // setInterval(sendUpdate, 2000);
            io.to(`${socket.id}`).emit('socket', `Messaged to ${socket.id} from server...`);
            console.log(socket.id);
            clients++;
            io.emit('client connected', { clients });
            console.log('user connected');
            socket.on('disconnect', (data) => {
                clients--;
                io.emit('client disconnected', { clients });
            });

            socket.on('message', (message) => {
                console.log('Message Recieved: ' + message);
                io.emit('message', { type: 'new-message', text: message });
            });

            socket.on('event', (data) => {
                console.log('event');
                io.emit('event', { payload: 'data from server!' });
            });
            socket.on('join room1', (data) => {
                socket.join('room1');
                io.to('room1').emit('joined room1', { room: 'You joined room 1!' });
            });
            socket.on('join room2', (data) => {
                socket.join('room2');
                io.to('room2').emit('joined room2', { room: 'You joined room 2!' });
            });
            socket.on('join room3', (data) => {
                socket.join('room3');
                io.to('room3').emit('joined room3', { room: 'You joined room 3!' });
            });

            socket.on('chat message', (msg) => {
                io.emit('chat message response', {msg});
            });

            socket.on('activate twitter feed', (data) => {
                console.log('Connected to twitter feed page!');
                this.Twitter.listenToTwitterFeed(socket);
            });

            socket.on('get product data', async (data) => {
                let products = await ProductController.returnAllProducts();
                socket.emit('product retrieved', { payload: products });
            });

            socket.on('increment product quantity', async (data) => {
                await ProductController.incrementProduct();
                let products = await ProductController.returnAllProducts();
                socket.emit('product retrieved', { payload: products });
            });

            socket.on('decrement product quantity', async (data) => {
                await ProductController.decrementProduct();
                let products = await ProductController.returnAllProducts();
                socket.emit('product retrieved', { payload: products });
            });



            // socket.on('client connected', (data) => {
            //     clients++;
            //     io.emit('client connected response', { clients })
            // })
        });
    }
}
