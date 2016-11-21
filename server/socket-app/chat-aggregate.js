module.exports=function(injected){
    class ChatAggregate{
        constructor(commandRouter, eventPortRouter){
            commandRouter.on('chatCommand', function(commandMessage){
                console.debug("Got chat command", commandMessage);
                eventPortRouter.routeMessage({
                    type:'chatMessageReceived',
                    message:commandMessage.message,
                    sender: commandMessage._session
                })
            })
        }
    }
    return ChatAggregate;
};

