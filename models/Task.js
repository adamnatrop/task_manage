const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    

}, {timestamps: true});

const tasks = mongoose.model("tasks", taskSchema);

module.exports = tasks;

