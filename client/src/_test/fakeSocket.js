export default function(){
    var socket= {
        listeners:{},
        on: function(event, callback){
            socket.listeners[event] = callback;
        }
    };
    return socket;
}