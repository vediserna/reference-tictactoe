module.exports=function(injected){
    const generateUUID=injected('generateUUID');
    const commandRouter=injected('commandRouter');
    const eventRouter=injected('eventRouter');

    return {
        startHandling(){
            commandRouter.on('chatCommand', function(commandMessage){

                console.debug("commandMessage.message -.............................. ", commandMessage.message);
                eventRouter.routeMessage({
                    eventId:generateUUID(),
                    type:'chatMessageReceived',
                    message:commandMessage.message,
                    sender: commandMessage._session
                })
            })
        }
    }
};

