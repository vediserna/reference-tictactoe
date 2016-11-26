const inject = require('common/framework/inject');
const ioModule = require('_test/fakeIo');
const webSocketModule = require('./webSocket');
const io = ioModule();


describe("webSocket", function () {

    var socket;
    var socketURI = 'http://localhost:8080/';

    beforeEach(function () {
        socket = webSocketModule(inject({io, socketURI}));
    });

    describe("initialization", function () {
        beforeEach(function () {
            // Setup for this case
        });

        it('should connect to socket', function () {
            expect(io._connectedTo).toBe(socketURI);
        });
    });


});