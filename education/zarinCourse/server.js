const express = require('express');
const app = express();
const bodyParser = require('body-parser');
global.config = require('./app/config');
let appConfig = require('config');
const mongoose = require('mongoose');


// connect to mongo
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true)
mongoose.connect(appConfig.mongo.host, (err) => {
    if (err)
        console.log("mongo connection error" + err)
    else
        console.log("Successfully connected to mongo database!")

});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


const routes = require('./app/routes');


app.use('/api', routes);


app.listen(appConfig.appPort, () => console.log(`listening on port ${appConfig.appPort}`));


module.exports = app;
