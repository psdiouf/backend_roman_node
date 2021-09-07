const app = require('./app')
const http = require('http')
const server = http.createServer(app);
const socket = require('socket.io')(server)
app.set('port', process.env.PORT || 3000)

socket.on('connection', (client) => {
    console.log("nouveau utilisateur connecté : " + client);
    client.on('message', data => {
        console.log(data);
        client.emit('message', data);
        client.on('disconnect', () => {
            console.log('utilisateur de connecté');
        })
    })
    // client.emit("message", () => {
    //     res.json("message de bienvenue");
    // })
})
server.listen(process.env.PORT || 3000, '192.168.1.16')