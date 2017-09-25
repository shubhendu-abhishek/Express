const configurations = {
    development: {
        root: require('path').normalize(__dirname + '/..'),
        app: {
            name: 'company-feedback'
        },
        host: process.env.HOST || 'http://localhost',
        port: process.env.PORT || 8080
    }
}
let env = process.env.NODE_ENV || 'development';
module.exports = configurations[env];