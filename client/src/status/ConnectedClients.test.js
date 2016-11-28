import ConnectedClientsModule from './ConnectedClients';
import ReactDOM from 'react-dom';
import React from 'react';
import { shallow } from 'enzyme';

describe("Connected socket clients component", function () {

    var div, component;

    var socket = {
        listeners:{},

        on: function(event, callback){
            socket.listeners[event] = callback;
        }
    };
    var ConnectedClients;

    beforeEach(function () {
        ConnectedClients = ConnectedClientsModule(inject({
            socket
        }));
        div = document.createElement('div');
        component = shallow(<ConnectedClients />, div);
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
        expect(component.text()).toContain('99 connected clients');
    });
});