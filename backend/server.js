const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

app.set('port', port); // express will not know which port the server is listening to, hence set the port.
const server = http.createServer(app); // make use of express to handle req and res, instead of http module
                                       // use http module for to create server.
server.listen(port);