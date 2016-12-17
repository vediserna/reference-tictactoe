module.exports=function(injected){

    const io = require('socket.io-client');
    const RoutingContext = require('../../client/src/routing-context');
    const generateUUID = require('../../client/src/common/framework/uuid');

    var connectCount =0;

    function userAPI(){
        var waitingFor=[];
        var commandId=0;

        var routingContext = RoutingContext(inject({
            io,
            env:"test"
        }));

        var thisGame = {};

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
                var cmdId = generateUUID();
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"chatCommand", message });
                return me;
            },
            expectChatMessageReceived:(message)=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('chatMessageReceived', function(chatMessage){
                    expect(chatMessage.sender).not.toBeUndefined();
                    if(chatMessage.message===message){
                        waitingFor.pop();
                    }
                });
                return me;
            },
            cleanDatabase:()=>{
                var cmdId = commandId++;
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"cleanDatabase"});
                return me;

            },
            waitForCleanDatabase:()=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('databaseCleaned', function(chatMessage){
                    waitingFor.pop();
                });
                return me;

            },
            expectGameCreated:function() {
                waitingFor.push("expectGameCreated");
                routingContext.eventRouter.on('GameCreated', function(game) {
                   thisGame = game;
                    expect(game.gameId).not.toBeUndefined();
                    if(game.gameId === thisGame.gameId) {
                       waitingFor.pop();
                    }
                });

                return me;
            },

            createGame:function() {
                thisGame.gameId = generateUUID();
                var cId = commandId++;
                routingContext.commandRouter.routeMessage({commandId:cId, type:"CreateGame", gameId:thisGame.gameId});
                return me;
            },

            expectGameJoined:function() {
                waitingFor.push("expectGameJoined");
                routingContext.eventRouter.on('GameJoined', function(game) {
                    thisGame = game;
                    expect(game.gameId).not.toBeUndefined();
                    if(game.gameId === thisGame.gameId) {
                       waitingFor.pop();
                    }
                });
                return me;
            },

            joinGame:function(gId) {
                var cId = commandId++;
                routingContext.commandRouter.routeMessage({gameId:gId, type:"JoinGame", commandId:cId});
                return me;
            },

            getGame:function() {
                return thisGame;
            },

            expectMoveMade:function() {
                waitingFor.push("expectMoveMade");
                routingContext.eventRouter.on('MovePlaced', function(game) {
                    expect(game.gameId).not.toBeUndefined();
                    if(game.gameId === thisGame.gameId) {
                       waitingFor.pop();
                    }
                });
                return me;
            },

            placeMove:function(row, col) {
                var bl = row*3+col;
                var cId = commandId++;
                routingContext.commandRouter.routeMessage({gameId:thisGame.gameId, side:thisGame.side, type:"PlaceMove", commandId:cId, block:bl});
                return me;
            },

            expectGameWon:function() {
                waitingFor.push("expectGameWon");
                routingContext.eventRouter.on('GameWon', function(game) {
                    expect(game.gameId).not.toBeUndefined();
                    if(game.gameId === thisGame.gameId) {
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
            },
        };
        return me;

    }

    return userAPI;
};
