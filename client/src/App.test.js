import React from 'react';
import ReactDOM from 'react-dom';
import AppModule from './App';
import inject from './infrastructure/inject';
import FakeViewModule from './_test/FakeView';
import fakeIoModule from './_test/fakeIo';

const ConnectedClients = FakeViewModule(inject({title:'ConnectedClients'}));

var io = fakeIoModule();

console.debug("IO", io);

const App = AppModule(inject({
  io: io,
  logo:'.logo.svg',
  ConnectedClients
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
