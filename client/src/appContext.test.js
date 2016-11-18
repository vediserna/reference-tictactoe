import appContextModule from  'appContext';
import ioModule from '_test/fakeIo';

describe('app context initialization', function () {

    it('should load app context without throwing', function () {
        const io = ioModule();
        appContextModule(inject({io, env:"test"}));
    });

});