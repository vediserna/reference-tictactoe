import inject from 'infrastructure/inject';
import ioModule from '_test/fakeIo';
import webSocketModule from './webSocket';
const io = ioModule();


describe("webSocket", function () {

    var socket;
    beforeEach(function () {
        socket = webSocketModule(inject({io}));
    });

    describe("initialization", function () {
        beforeEach(function () {
            // Setup for this case
        });

        it('should connect to socket', function () {
            expect(io._connectedTo).toBe('http://localhost:8080/');
        });
    });


});