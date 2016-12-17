const io = require('socket.io-client');
const RoutingContext = require('../client/src/routing-context');
var UserAPI = require('./fluentapi/user-api');
var TestAPI = require('./fluentapi/test-api');

const userAPI = UserAPI(inject({
    io,
    RoutingContext
}));

const testAPI = TestAPI(inject({
    io,
    RoutingContext
}));

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('Tictactoe Loadtest', function () {
    var userA, userB;

    beforeEach(function (done) {
        var testapi = testAPI();
        testapi.waitForCleanDatabase().cleanDatabase().then(()=> {
            testapi.disconnect();
            done();
        });
    });

    const count = 200;
    const timelimit = 20000;

    it('should be able to play ' + count + ' games to end in under ' + timelimit + 'ms', function (done) {
        var startMillis = new Date().getTime();

        var user;
        var users=[];
        for(var i=0; i<count; i++){
            user = userAPI("User#" + i);
            users.push(user);
        }

        user = userAPI("Final user");
        user.expectGameCreated()
            .createGame()
            .then(function(){
                user.disconnect();
                _.each(users, function(usr){
                    usr.disconnect();
                });

                var endMillis = new Date().getTime();
                var duration = endMillis - startMillis;
                if(duration > timelimit){
                    done.fail(duration + " exceeds limit " + timelimit);
                } else {
                    done();

                }
            });
    });
});