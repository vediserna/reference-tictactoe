import inject from './common/framework/inject';

import generateUUID from 'common/framework/uuid';

import AppModule from 'App';
import WebSocketModule from 'io/webSocket';
import ConnectedClientsModule from 'status/ConnectedClients';
import ConnectedUsersModule from 'status/ConnectedUsers';
import ChatModule from 'chat/Chat';
import MessageRouter from 'common/framework/message-router'

import IncomingSocketMessageDispatcherModule from 'common/framework/incoming-socket-message-dispatcher';
import OutgoingSocketIoMessagePortModule from 'common/framework/outgoing-socket-io-message-port';

function appContext(injected){

    const eventRouter = MessageRouter();
    const commandRouter = MessageRouter();
    const queryRouter = MessageRouter();

    const environment = injected('env');
    var socketURI;
    if(environment==='development'){
        socketURI='http://localhost:8080'
    } else {
        socketURI='/'
    }
    const io = injected('io');
    const socket = WebSocketModule(inject({
        io,
        socketURI:socketURI
    }));

    const incomingSocketEventDispatcher = IncomingSocketMessageDispatcherModule(
        inject({
            socketIoVerb:'eventIssued',
            messageRouter:eventRouter
        })
    );
    const incomingSocketQueryDispatcher = IncomingSocketMessageDispatcherModule(
        inject({
            socketIoVerb:'queryResult',
            messageRouter:queryRouter
        })
    );

    const outgoingSocketIoMessagePort = OutgoingSocketIoMessagePortModule(
        inject({
            io:socket,
            messageRouter:commandRouter
        })
    );

    outgoingSocketIoMessagePort.dispatchThroughIo('*','issueCommand');


    const ConnectedClients = ConnectedClientsModule(inject({
        socket
    }));
    const ConnectedUsers = ConnectedUsersModule(inject({
        socket
    }));
    const Chat = ChatModule(inject({
        commandPort:commandRouter,
        eventRouter,
        queryRouter,
        generateUUID: generateUUID
    }));

    const App = AppModule(inject({
        io,
        ConnectedClients,
        ConnectedUsers,
        Chat,
        socket,
        eventRouter
    }));

    var exports = {
        App

    };

    incomingSocketEventDispatcher.startDispatching(socket);
    incomingSocketQueryDispatcher.startDispatching(socket);

    return exports;

}

export default appContext;