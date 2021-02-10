// require your server and launch it
const server = require('./api/server.js');

const PORT = 7000;

server.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});