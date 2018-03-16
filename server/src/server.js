import http from 'http';
import router from '../Routes/app';

// app.use('api/v1/', router);


// creating the port where app will listen for incoming request
const port = parseInt(process.env.PORT, 10) || 8000;

router.set('port', port);

// creating server
const server = http.createServer(router);

// server listening at designated port
server.listen(port);
