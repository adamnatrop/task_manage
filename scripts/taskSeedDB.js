const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/task_manage");

const taskDataSeed = [
    {
        content: "take trash out",
        
    },
    {
        content: "pick up drycleaning",
        
    },
    {
        content: "make dinner",
        
    }
];

db.Tasks.remove({})
.then(() => db.Tasks.collection.insertMany(taskDataSeed))
.then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
