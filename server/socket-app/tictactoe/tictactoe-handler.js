
module.exports = function(injected){
    var TictactoeState = injected('TictactoeState');

    return function(history){

        var gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){

                var cmdHandlers = {
                    "CreateGame": function (cmd) {
                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.gameFull()){
                            eventHandler( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    "PlaceMove": function(cmd){
                        var events = [{
                                gameId: cmd.gameId,
                                type: "",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                block: cmd.block,
                                side: cmd.side
                            }];
                        if(gameState.isItMyMove(cmd.side)) {
                            if(!gameState.blockFree(events[0].block)) {
                                events[0].type = "IllegalMove";
                            } else {
                                events[0].type = "MovePlaced";
                            }
                        } else {
                            events[0].type = "NotYourMove";
                        }

                        gameState.processEvents(events);
                        eventHandler(events);
                    }
                };

                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};

