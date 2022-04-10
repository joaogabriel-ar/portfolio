const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';

function connectDataBase() {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("Connected");
    });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = connectDataBase;