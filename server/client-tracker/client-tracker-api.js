
module.exports=function(injected){

    const io = injected('io');

    var clientId = 0;
    var numClients=0;

    var connected={

    };

    function trackClient(clientId, socket) {

        var newUser = {clientId, userName: "Newbie#" + clientId};
        io.emit('userJoined', newUser);
        socket.emit('userAcknowledged', newUser); //
        numClients++;
        emitStats();

        connected[clientId] = newUser;
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
            console.debug("Got user name change, emitting change event ", changedUser );
            io.emit('userChanged', changedUser)
        });

        socket.on('sendMessage', function(messageObj){
            console.debug("Got message ", messageObj);
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