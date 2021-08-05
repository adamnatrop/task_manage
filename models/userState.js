const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userStateSchema = new Schema({
    tasks: {
        type: String
    }
    

}, {timestamps: true});

const tasks = mongoose.model("userState", userStateSchema);

module.exports = userState;

