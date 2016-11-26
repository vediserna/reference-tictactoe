// TODO REFACTOR!

module.exports=function(injected){
    const generateUUID=injected('generateUUID');

    class ChatHandler{
        constructor(commandRouter, eventPortRouter){
            commandRouter.on('chatCommand', function(commandMessage){
                eventPortRouter.routeMessage({
                    eventId:generateUUID(),
                    type:'chatMessageReceived',
                    message:commandMessage.message,
                    sender: commandMessage._session
                })
            })
        }
    }
    return ChatHandler;
};

