import * as express from 'express';
import * as socketIo from 'socket.io';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { Server } from 'http';
import * as mongoose from 'mongoose';
import { SocketController } from './controllers/SocketController';
// import { productArray } from './data/products';
// import { ProductRouter } from './routes/product';
// import { ProductController } from './controllers/Products';
// import { TwitterAPIController } from './controllers/API/TwitterController';
const http = require('http');

export class PublicServer {
    public static readonly PORT: number = 3000;
    private app: express.Application;
    private server: Server;
    private io: socketIo.Server;
    private port: string | number = 5000;
    private productArray: any[];

    /**
     * Constructor
     */
    constructor() {
        this.createApp();
        this.config();
        this.api();
        this.createServer();
        this.sockets();
        this.routes();
        this.listen();
    }

    private createApp() {
        this.app = express();
    }

    private createServer(): void {
        this.server = http.createServer(this.app);
    }

    private async config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        const MONGO_URI = 'mongodb://localhost:27017/socket-products-test';
        mongoose.connect(MONGO_URI, { useNewUrlParser: true })
            .then(() => console.log('Connected to DB'))
            .catch(() => console.log('There was an error'));

        const products = express.Router();
        // ProductRouter.init(products);
        this.app.use('/products', products);
        // console.log(this.productArray);
        // console.log(productArray);
    }

    private api() {
        //const Twitter = new TwitterAPIController();
        //Twitter.listenToTwitterFeed();
    }

    private sockets(): void {
        const sockets = new SocketController();
        sockets.connect(this.server);
    }

    private listen(): void {
        const server = this.server;
        server.listen(this.port, () => {
            console.log('Running server on port: ' + this.port);
        });
        server.on('error', onError);
        server.on('listening', onListening);
        function onError(error: any) {
            if (error.syscall !== 'listen') {
                throw error;
            }

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(this.port + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(this.port + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }
        function onListening() {
            const addr = server.address();
            const bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            console.log('Listening on ' + bind);
        }
    }

    public async routes() {
    }
}
