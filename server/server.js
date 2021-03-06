import http from 'http';
import router from '../server/Routes/app';


// creating the port where app will listen for incoming request
const port = parseInt(process.env.PORT, 10) || 9000;

router.set('port', port);

// creating server
const server = http.createServer(router);

// server listening at designated port
server.listen(port);

module.exports = server;
