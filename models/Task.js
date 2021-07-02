const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        
    },

}, {timestamps: true});

const taskModel = mongoose.model("taskModel", taskSchema);

module.exports = taskModel;

