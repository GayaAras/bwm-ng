const express = require('express');
const mongoose = require ('mongoose');
const config = require ('./config/dev');
const FakeDb = require ('./fake-db');
const Rental = require ('./models/rental');

const rentalRoutes = require('./routes/rentals');

//mongoose.connect('mongodb://Test:testtest@bwm-ng-dev-shard-00-00-ihzah.mongodb.net:27017,bwm-ng-dev-shard-00-01-ihzah.mongodb.net:27017,bwm-ng-dev-shard-00-02-ihzah.mongodb.net:27017/test?ssl=true&replicaSet=bwm-ng-dev-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true })

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running');
});
