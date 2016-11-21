module.exports=function(injected){

    const io = injected('io');
    const IncomingSocketMessageDispatcher = injected('IncomingSocketMessageDispatcher');
    const commandRouter = injected('commandRouter');

    var clientId = 0;
    var numClients=0;

    var connected={

    };

    function trackClient(clientId, socket) {

        var i =0;
        var newUserSession = {clientId, userName: "Newbie#" + clientId};
        io.emit('userJoined', newUserSession);
        socket.emit('userAcknowledged', newUserSession); //
        numClients++;
        emitStats();

        var socketCommandDispatcher = new IncomingSocketMessageDispatcher('issueCommand', socket, commandRouter, newUserSession);

        connected[clientId] = newUserSession;
        socket.emit('usersConnected', connected);

        socket.on('disconnect', ()=>{
            io.emit('userLeft', {clientId, message : "User left the party"});
            numClients--;
            emitStats();
            delete connected[clientId];
        });

        socket.on('changeUserName', function(userNameChange){
            var changedUser = {clientId, userName:userNameChange.userName };
            connected[clientId] = changedUser;
            io.emit('userChanged', changedUser)
        });

        socket.on('sendMessage', function(messageObj){
            io.emit('messageReceived', {clientId, sender: connected[clientId],  message: messageObj.message })
        })

    }


    function emitStats() {
        io.emit('stats', {numClients: numClients});
        console.log("Connected clients: " + numClients);
    }

    io.on('connection', function(socket){
        trackClient(clientId++, socket);

    });

};