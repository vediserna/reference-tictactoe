module.exports=function(injected){
    class SocketIoEventPort{
        constructor(io, eventRouter){
            eventRouter.on('*', (event)=>{
                console.debug("Emitting event on socket io bus", event);
                io.emit('eventIssued', event);
            })
        }
    }
    return SocketIoEventPort;
};

