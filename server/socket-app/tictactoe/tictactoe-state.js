var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
        var gameFullvariable = false;
        var board = ['', '', '', 
                     '', '', '',
                     '', '', ''];
        var nextMove = 'X';

        function processEvent(event) {
            //console.debug("event", event);

            if(event.type==="JoinGame") {
                gameFullvariable = true;
            }

            if(event.type==="MovePlaced") {
                board[event.block] = event.side;
                if(event.side === 'X') {
                    nextMove = 'O';
                } else {
                    nextMove = 'X';
                }
                //console.debug("***BOARD STATUS***" ,board);
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gameFullvariable;
        }

        function blockFree(block) {
            if(board[block] === '') {
                return true;
            }
            return false;
        }

        function isItMyMove(side) {
            return side === nextMove;
        }

        function gameWon() {
            return (board[0] !== '' && board[1] === board[0] && board[2] === board[1]) || //horizontal
                   (board[3] !== '' && board[4] === board[3] && board[5] === board[4]) || //horizontal
                   (board[6] !== '' && board[7] === board[6] && board[8] === board[7]) || //horizontal
                   (board[0] !== '' && board[3] === board[0] && board[6] === board[3]) || //vertical
                   (board[1] !== '' && board[4] === board[1] && board[7] === board[4]) || //vertical
                   (board[2] !== '' && board[5] === board[2] && board[8] === board[5]) || //vertical
                   (board[0] !== '' && board[4] === board[0] && board[8] === board[4]) || //transverse
                   (board[2] !== '' && board[4] === board[2] && board[6] === board[4])    //transverse
        }

        function gameDraw() {
            if(board.indexOf('') < 0) {
                return true;
            }
            return false;
        }

        processEvents(history);

        return {
            processEvents: processEvents,
            gameFull: gameFull,
            blockFree: blockFree,
            isItMyMove: isItMyMove,
            gameWon: gameWon,
            gameDraw: gameDraw
        }
    };
};
