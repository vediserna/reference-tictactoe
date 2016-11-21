module.exports=function(injected){

    const io = injected('io');

    var clientId = 0;
    var numClients=0;

    var connected={

    };

    function trackClient(clientId, socket) {

        var i =0;
        console.debug("track client " + (i++));
        var newUser = {clientId, userName: "Newbie#" + clientId};
        console.debug("track client " + (i++));
        io.emit('userJoined', newUser);
        console.debug("track client " + (i++));
        socket.emit('userAcknowledged', newUser); //
        console.debug("track client " + (i++));
        numClients++;
        console.debug("track client " + (i++));
        emitStats();
        console.debug("track client " + (i++));

        connected[clientId] = newUser;
        console.debug("track client " + (i++));
        socket.emit('usersConnected', connected);
        console.debug("track client " + (i++));

        socket.on('disconnect', ()=>{
            io.emit('userLeft', {clientId, message : "User left the party"});
            numClients--;
            emitStats();
            delete connected[clientId];
        });
        console.debug("track client " + (i++));

        socket.on('changeUserName', function(userNameChange){
            var changedUser = {clientId, userName:userNameChange.userName };
            connected[clientId] = changedUser;
            io.emit('userChanged', changedUser)
        });
        console.debug("track client " + (i++));

        socket.on('sendMessage', function(messageObj){
            console.debug("Got message ", messageObj);
            io.emit('messageReceived', {clientId, sender: connected[clientId],  message: messageObj.message })
        })
        console.debug("track client " + (i++));

    }


    function emitStats() {
        io.emit('stats', {numClients: numClients});
        console.log("Connected clients: " + numClients);
    }

    console.debug("Setting up connection listen");
    io.on('connection', function(socket){
        console.debug("Lets track client");
        trackClient(clientId++, socket);
        console.debug("After track client");

    });

};