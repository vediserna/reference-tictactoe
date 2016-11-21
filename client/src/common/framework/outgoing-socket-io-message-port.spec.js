const SocketIoEventPort = require('./outgoing-socket-io-message-port')(inject({}));


describe('outgoing socket io message port', function(){

    var fakeIo = {
        _emitted:{},
        emit: function(verb, message){
            fakeIo._emitted[verb] = fakeIo._emitted[verb] || [];
            fakeIo._emitted[verb].push(message);
        }
    };

    var fakeRouter = {
        _subscriptions:{},
        on:function(verb, callback){
            fakeRouter._subscriptions[verb]=callback;
        }
    };

    it('should subscribe to all messages routed through message router',function(){
        new SocketIoEventPort(fakeIo, fakeRouter);
        expect(fakeRouter._subscriptions['*'].length).toBe(1);

    });

    it('should emit event from socketIo server under eventIssued verb',function(){
        new SocketIoEventPort(fakeIo, fakeRouter);
        fakeRouter._subscriptions["*"]({message:"test message"});
        expect(fakeIo._emitted["eventIssued"].length).toBe(1);

    });

});

describe('chat server', function(){

    it('should dispatch message received event on sendMessage command',function(){


    });

});