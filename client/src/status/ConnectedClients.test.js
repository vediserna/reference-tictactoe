import ConnectedClientsModule from './ConnectedClients';
import ReactDOM from 'react-dom';
import React from 'react';

describe("Connected clients component", function () {

    var socket = {
        listeners:{},

        on: function(event, callback){
            socket.listeners[event] = callback;
        }
    };
    var ConnectedClients;

    var div, component;
    beforeEach(function () {
        ConnectedClients = ConnectedClientsModule(inject({
            socket
        }));
        div = document.createElement('div');
        component = ReactDOM.render(<ConnectedClients />, div);
    });

    it('should render without error', function () {

    });

    it('should subscribe to stats message', function(){
        expect(socket.listeners['stats']).toBeTruthy();
    });

    it('should render number of clients reported in stats', function(){
        socket.listeners['stats']({
            numClients:99
        });
        expect().toBeTruthy();
    });
});