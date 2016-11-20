module.exports=function(injected){
    const io = injected('io');

    function emitChatMessageEvent(messageEvent) {
        io.emit('messageEvent', messageEvent);
    }

    io.on('messageCommand', function(socket){
        socket.emit('announcements', {message : "A new user has joined"});
        numClients++;
        emitStats();

        socket.on('disconnect', ()=>{
            socket.emit('announcements', {message : "User left the party"});
            numClients--;
            emitStats()
        })

    });


};