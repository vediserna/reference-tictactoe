import ReactDOM from 'react-dom';
import React from 'react';
import { shallow } from 'enzyme';

import ConnectedUsersModule from './ConnectedUsers';
import FakeSocket from '_test/fakeSocket';

describe('Connected users - socket io', function () {

    var div, component;

    var socket = FakeSocket();

    var ConnectedUsers;

    beforeEach(function () {
        ConnectedUsers = ConnectedUsersModule(inject({
            socket
        }));

        div = document.createElement('div');
        component = shallow(<ConnectedUsers />, div);
    });

    it('should subscribe to userJoined', function () {
        expect(socket.listeners['userJoined']).toBeTruthy();
    });

    it('should subscribe to userAcknowledged', function () {
        expect(socket.listeners['userAcknowledged']).toBeTruthy();
    });

    it('should subscribe to userLeft', function () {
        expect(socket.listeners['userLeft']).toBeTruthy();
    });

    it('should subscribe to userChanged', function () {
        expect(socket.listeners['userChanged']).toBeTruthy();
    });

    it('should subscribe to usersConnected', function () {
        expect(socket.listeners['usersConnected']).toBeTruthy();
    });

    it('should render users when usersConnected', function () {
        socket.listeners['usersConnected']({"1":{"clientId":1,"userName":"Newbie#1"},"2":{"clientId":2,"userName":"Newbie#2"}});

        expect(component.text()).toContain('Newbie#1');
        expect(component.text()).toContain('Newbie#2');

    });

    it('should remove user when userLeft', function () {
        socket.listeners['usersConnected']({"1":{"clientId":1,"userName":"Newbie#1"},"2":{"clientId":2,"userName":"Newbie#2"}});
        socket.listeners['userLeft']({"clientId":1});

        expect(component.text()).not.toContain('Newbie#1');
    });

    it('should render allocated user name when userAcknowledged', function () {
        socket.listeners['userAcknowledged']({"clientId":1,"userName":"Newbie#1"});

        expect(component.find('input').props().value).toContain('Newbie#1');
    });

    it('should update user when userChanged', function () {
        socket.listeners['usersConnected']({"1":{"clientId":1,"userName":"Newbie#1"},"2":{"clientId":2,"userName":"Newbie#2"}});
        socket.listeners['userChanged']({"clientId":1,"userName":"Not new any more"});

        expect(component.text()).toContain('Not new any more');
    });

});