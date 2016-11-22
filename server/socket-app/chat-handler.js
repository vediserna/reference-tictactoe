module.exports=function(injected){
    class ChatHandler{
        constructor(commandRouter, eventPortRouter){
            commandRouter.on('chatCommand', function(commandMessage){
                eventPortRouter.routeMessage({
                    type:'chatMessageReceived',
                    message:commandMessage.message,
                    sender: commandMessage._session
                })
            })
        }
    }
    return ChatHandler;
};

