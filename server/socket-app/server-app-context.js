const generateUUID = require('client/src/common/framework/uuid');
const IncomingSocketMessageDispatcher = require('client/src/common/framework/incoming-socket-message-dispatcher');
const ChatHandlerModule = require('./chat/chat-handler');
const eventRouter = require('client/src/common/framework/message-router')();
const commandRouter = require('client/src/common/framework/message-router')();
const queryRouter = require('client/src/common/framework/message-router')();
const CommandRepo = require('./command-repo');
const EventRepo = require('./event-repo');
const OutgoingSocketIoMessagePort = require('client/src/common/framework/outgoing-socket-io-message-port');

module.exports=function(injected){

    const io = injected("io");
    const dbPool = injected("dbPool");


    const incomingCommandDispatcher = IncomingSocketMessageDispatcher(inject({
        socketIoVerb:'issueCommand',
        messageRouter:commandRouter
    }));


    const socketIoEventPort = OutgoingSocketIoMessagePort
    (inject({
        io:io,
        messageRouter:eventRouter
    }));


    require('./user-session-manager')(inject({
        io,
        OutgoingSocketIoMessagePort,
        incomingSocketMessageDispatcher: incomingCommandDispatcher,
        commandRouter,
        queryRouter
    }));

    const chatHandler = ChatHandlerModule(inject({
        generateUUID,
        commandRouter,
        eventRouter
    }));


    const commandRepo = CommandRepo(
        inject({
            dbPool,
            commandRouter
        }));

    const eventRepo = EventRepo(
        inject({
            dbPool,
            eventRouter,
            queryRouter,
            commandRouter
        }));

    socketIoEventPort.dispatchThroughIo('*', 'eventIssued');
    chatHandler.startHandling();

    return {
        chatHandler,
        commandRepo,
        eventRepo
    };
};