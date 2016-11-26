const userAPI = require('./fluentapi/user-api')(inject({

}));

describe('User chat API', function(){
    var user;

    beforeEach(function(){
        user = userAPI();
    });

    afterEach(function(){
        user.disconnect();
    });

    it('should get user session information on connect',function(done){
        user.expectUserAck().then(done);
    });

    it('should receive chat message back after sending chat command',function(done){
        user.sendChatMessage('message one ')
            .expectChatMessageReceived('message one ')
            .then(done);
    });

});


describe('User chat load test', function(){

    it('should connect one hundred users with each one sending a message',function(done){

        var startMillis = new Date().getTime();

        var user;
        var users=[];
        for(var i=0; i<100; i++){
            user = userAPI("User#" + i);
            users.push(user);
            user.sendChatMessage('Message ' + i);
        }

        user = userAPI("Final user");
        user.sendChatMessage('TWO')
            .expectChatMessageReceived('TWO')
            .then(function(){
                user.disconnect();
                _.each(users, function(usr){
                    usr.disconnect();
                });

                var endMillis = new Date().getTime();
                console.log("Test took " + (endMillis - startMillis) + "ms to execute");

                done();
            });
    });
});
