module.exports = function(deps) {
    var app = deps('app');
    console.debug("Got deps " + app);
    app.get('/api/user', function(req, res) {
        console.debug("Got API user request");
        res.send({
            name:"anonymous",
            status:"authenticated"
        });
    });
};