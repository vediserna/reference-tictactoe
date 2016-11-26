module.exports=function(injected){
    const socketIoVerb = injected('socketIoVerb');
    const messageRouter = injected('messageRouter');

    return {
        startDispatching: function(_socket, _session){
            var socket = _socket;
            var session = _session;

            var listener;
            listener = (message)=>{
                message._session = session;
//                 console.debug(socketIoVerb + " - dispatching message", message , " through router ");
                messageRouter.routeMessage(message);
            };

            socket.on(socketIoVerb, listener);
            return {
                stopDispatching:function(){
                    socket.removeListener(socketIoVerb, listener);
                }
            }
        }
    };
};