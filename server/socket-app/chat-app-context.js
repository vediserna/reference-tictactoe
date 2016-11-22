const IncomingSocketMessageDispatcher = require('client/src/common/framework/incoming-socket-message-dispatcher');
const eventMessageRouter = require('client/src/common/framework/message-router')();
const commandRouter = require('client/src/common/framework/message-router')();

module.exports=function(injected){

    var x=0;
    const io = injected("io");


    const incomingSocketMessageDispatcher = IncomingSocketMessageDispatcher(inject({
        socketIoVerb:'issueCommand',
        messageRouter:commandRouter
    }));

    const SocketIoEventPort = require('client/src/common/framework/outgoing-socket-io-message-port')(inject({

    }));

    var socketIoEventPort = new SocketIoEventPort(io, eventMessageRouter);

    require('./user-session-manager')(inject({
        io,
        incomingSocketMessageDispatcher,
        commandRouter
    }));

    const ChatApp = require('./chat-aggregate')(inject({}));

    const chatAggregate = new ChatApp(commandRouter, eventMessageRouter);

    return {
        chatAggregate
    };
};