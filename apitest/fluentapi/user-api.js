module.exports=function(injected){

    const io = require('socket.io-client');
    const RoutingContext = require('../../client/src/routing-context');

    var connectCount =0;

    function userAPI(userName){
        var waitingFor=[];
        var commandId=0;

        var routingContext = RoutingContext(inject({
            io,
            env:"test"
        }));

        connectCount++;
        const me = {
            expectUserAck:(cb)=>{
                waitingFor.push("expectUserAck");
                routingContext.socket.on('userAcknowledged', function(ackMessage){
                    expect(ackMessage.clientId).not.toBeUndefined();
                    waitingFor.pop();
                });
                return me;
            },
            sendChatMessage:(message)=>{
                var cmdId = commandId++;
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"chatCommand", message });
                return me;
            },
            expectChatMessageReceived:(message)=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('chatMessageReceived', function(chatMessage){
                    if(chatMessage.message===message){
                        waitingFor.pop();
                    }
                });
                return me;
            },
            then:(whenDoneWaiting)=>{
                function waitLonger(){
                    if(waitingFor.length>0){
                        setTimeout(waitLonger, 0);
                        return;
                    }
                    whenDoneWaiting();
                }
                waitLonger();
                return me;
            },
            disconnect:function(){
                routingContext.socket.disconnect();
            }

        };
        return me;

    }

    return userAPI;
};
