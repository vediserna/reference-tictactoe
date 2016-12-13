var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
        var gameFullvariable = false;

        function processEvent(event) {
            console.debug("event", event);

            if(event.type==="JoinGame") {
                gameFullvariable = true;
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return gameFullvariable;
        }

        processEvents(history);

        return {
            processEvents: processEvents,
            gameFull: gameFull
        }
    };
};
