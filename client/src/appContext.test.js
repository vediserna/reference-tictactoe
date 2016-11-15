import appContextModule from  'appContext';
import ioModule from '_test/fakeIo';

fdescribe('app context initialization', function () {

    it('should load app context without throwing', function () {
        const io = ioModule();
        appContextModule(inject({io}));
    });

});