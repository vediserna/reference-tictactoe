import inject from './microdi/inject';
import logo from './logo.svg';
import './App.css';

import AppModule from './App';
import WebSocketModule from './io/webSocket';
import ConnectedClientsModule from 'status/ConnectedClients';


function appContext(injected){

    const environment = injected('env');
    var socketURI;
    if(environment=='development'){
        socketURI='http://localhost:8080'
    } else {
        socketURI='/'
    }
    const io = injected('io');
    const socket = WebSocketModule(inject({
        io,
        socketURI:socketURI
    }));

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