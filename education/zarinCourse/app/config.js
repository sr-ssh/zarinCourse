const path = require('path')

module.exports = {
    publicRoute: [],
    path: {
        controllers: {
            root: path.resolve('./app/controllers'),
            user: path.resolve('./app/controllers/user'),
        },
        models: {
            root: path.resolve('./app/models/'),
        },
        mainController: path.resolve('./app/controllers/MainController'),
    }
} 