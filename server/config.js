module.exports = {
    development: {
        sessionSecret: 'developmentSessionSecret',
        db: {
            name: 'anOutlandishDatabase',
            host: 'localhost',
            username: '',
            password: ''
        }
    },

    production: {
        sessionSecret: 'productionSessionSecret',
        db: {
            name: 'anOutlandishDatabase',
            host: 'productionHost',
            username: 'productionDatabaseUsername',
            password: 'productionDatabasePassword'
        }
    }
};