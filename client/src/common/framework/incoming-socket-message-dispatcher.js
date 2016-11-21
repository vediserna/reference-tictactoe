module.exports=function(injected){

    class IncomingSocketMessageDispatcher{
        constructor(socketIoVerb, socket, messageRouter, session ){
            this.socket = socket;
            this.verb = socketIoVerb;
            this.listener = (message)=>{
                message._session = session;
                messageRouter.routeMessage(message);
            };
            socket.on(socketIoVerb, this.listener);
        }
        stopDispatching(){
            console.debug("Stop dispatching");
            this.socket.removeListener(this.verb, this.listener);
        }
    }

    return IncomingSocketMessageDispatcher;
};