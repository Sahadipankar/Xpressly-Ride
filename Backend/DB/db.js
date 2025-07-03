const mongoose = require('mongoose');


function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
    })
        .catch(err => {
        });
}


module.exports = connectToDB;