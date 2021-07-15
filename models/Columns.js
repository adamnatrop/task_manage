const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    taskIds: {
        type: Array,
        required: true
    }
    

}, {timestamps: true});

const columns = mongoose.model("columns", columnsSchema);

module.exports = columns;

