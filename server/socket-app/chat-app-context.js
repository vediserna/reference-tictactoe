module.exports=function(injected){

    var x=0;
    const io = injected("io");

    const eventMessageRouter = _require('framework/message-router')();

    const commandRouter = require('client/src/common/framework/message-router')();

    const IncomingSocketMessageDispatcher = _require('framework/incoming-socket-message-dispatcher')(inject({}));

    const SocketIoEventPort = _require('framework/outgoing-socket-io-message-port')(inject({}));

    var socketIoEventPort = new SocketIoEventPort(io, eventMessageRouter);

    require('./user-session-manager')(inject({
        io,
        IncomingSocketMessageDispatcher,
        commandRouter
    }));

    const ChatApp = require('./chat-aggregate')(inject({}));

    console.debug("Create ChatApp");
    const chatAggregate = new ChatApp(commandRouter, eventMessageRouter);
    console.debug("Create ChatApp DONE");
    return {
        chatAggregate
    };
};