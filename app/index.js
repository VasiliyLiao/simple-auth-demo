const http = require('http');
const env = require('./getEnv');
const app = require('./app');

const server = http.createServer(app);

server.listen(env.PORT);
server.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof env.PORT === 'string'
        ? 'Pipe ' + env.PORT
        : 'Port ' + env.PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    console.info('Express App Listening on ' + bind);
});
