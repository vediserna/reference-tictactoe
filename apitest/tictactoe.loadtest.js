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

    const count = 100;
    const timelimit = 10000;

    it('should be able to play ' + count + ' games to end in under ' + timelimit + 'ms', function (done) {
        var startMillis = new Date().getTime();

        var user;
        var users=[];
        for(var i=0; i<count-2; i++){
            user = userAPI("User#" + i);
            users.push(user);
        }

         for(var i = 0; i < count-2; i++) {
            var playerOne = users[i];
            i++;
            var playerTwo = users[i];
            
             playerOne.expectGameCreated().createGame().then(()=> {
                playerTwo.expectGameJoined().joinGame(playerOne.getGame().gameId).then(function () {
                    playerOne.expectMoveMade().placeMove(0).then(()=> {
                        playerOne.expectMoveMade();
                        playerTwo.expectMoveMade().placeMove(3).then(()=> {
                            playerTwo.expectMoveMade(); // By other user
                            playerOne.expectMoveMade().placeMove(4).then(()=> {
                                playerOne.expectMoveMade(); // By other user
                                playerTwo.expectMoveMade().placeMove(2).then(()=> {
                                    playerTwo.expectMoveMade(); // By other user
                                    playerOne.expectMoveMade().placeMove(8)
                                        .expectGameWon().then(done); // Winning move
                                })
                            })
                        });
                    })
                })
            });
        }

        playerOne = userAPI("Final playerOne");
        playerTwo = userAPI("Final playerTwo");
        playerOne.expectGameCreated().createGame().then(()=> {
                playerTwo.expectGameJoined().joinGame(playerOne.getGame().gameId).then(function () {
                    playerOne.expectMoveMade().placeMove(0).then(()=> {
                        playerOne.expectMoveMade();
                        playerTwo.expectMoveMade().placeMove(3).then(()=> {
                            playerTwo.expectMoveMade(); // By other user
                            playerOne.expectMoveMade().placeMove(4).then(()=> {
                                playerOne.expectMoveMade(); // By other user
                                playerTwo.expectMoveMade().placeMove(2).then(()=> {
                                    playerTwo.expectMoveMade(); // By other user
                                    playerOne.expectMoveMade().placeMove(8)
                                        .expectGameWon().then(done); // Winning move
                                })
                            })
                        });
                    })
                })
            }).then(function(){
                    playerOne.disconnect();
                    playerTwo.disconnect();
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