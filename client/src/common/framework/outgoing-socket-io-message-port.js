module.exports=function(injected){
    class SocketIoEventPort{
        constructor(socketIo, messageRouter, socketVerb){
            socketVerb = socketVerb || 'eventIssued';
            messageRouter.on('*', (event)=>{
                console.debug("Emitting event on socket io bus", event);
                socketIo.emit(socketVerb, event);
            })
        }
    }
    return SocketIoEventPort;
};

