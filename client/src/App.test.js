import React from 'react';
import ReactDOM from 'react-dom';
import AppModule from './App';
import inject from './common/framework/inject';
import fakeIoModule from './_test/fakeIo';
import appContextModule from './appContext';

var io = fakeIoModule();
var eventRouter = fakeIoModule();

var { App } = appContextModule(inject({
  io:io,
  env:'test',
  eventRouter:eventRouter
}));


it('renders App with dependencies without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
