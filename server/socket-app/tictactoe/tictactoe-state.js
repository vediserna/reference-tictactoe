var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
        var gameFullvariable = false;
        var board = [];
        var nextMove = 'X';

        function processEvent(event) {
            console.debug("event", event);

            if(event.type==="JoinGame") {
                gameFullvariable = true;
            }

            if(event.type==="MovePlaced") {
                board.push(event.block);
                if(event.side === 'X') {
                    nextMove = 'O';
                } else {
                    nextMove = 'X';
                }
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gameFullvariable;
        }

        function blockFree(block) {
            var blockFree = board.indexOf(block);
            if(blockFree < 0) {
                return true;
            }
            return false;
        }

        function isItMyMove(side) {
            return side === nextMove;
        }

        processEvents(history);

        return {
            processEvents: processEvents,
            gameFull: gameFull,
            blockFree: blockFree,
            isItMyMove: isItMyMove
        }
    };
};
