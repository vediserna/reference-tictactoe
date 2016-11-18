module.exports = function(injected) {
    var app = injected('app');

    app.get('/api/config', function(req, res) {
        res.send({
            socket:"http://localhost:8080"
        });
    });
};