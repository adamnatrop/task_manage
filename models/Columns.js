const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    taskIds: [
        {
            type: Schema.Types.ObjectId,
            ref: "tasks"
        },
       
    ]
    
    
    
    

}, {timestamps: true});

const columns = mongoose.model("columns", columnsSchema);

module.exports = columns;

