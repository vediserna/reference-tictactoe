import inject from './infrastructure/inject';
import logo from './logo.svg';
import './App.css';

import AppModule from './App';
import WebSocketModule from './io/webSocket';
import ConnectedClientsModule from 'status/ConnectedClients';


function appContext(injected){

    const io = injected('io');
    const socket = WebSocketModule(inject({io}));

    const ConnectedClients = ConnectedClientsModule(inject({
        socket
    }));

    const App = AppModule(inject({
        io,
        logo,
        ConnectedClients
    }));

    var exports = {
        App
    };

    return exports;

}

export default appContext;