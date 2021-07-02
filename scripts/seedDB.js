const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/task_manage");

const taskDataSeed = [
    {
        task: "take trash out",
        status: "new"
    },
    {
        task: "pick up drycleaning",
        status: "wip"
    },
    {
        task: "make dinner",
        status: "completed"
    }
];

db.TaskModel.remove({})
.then(() => db.TaskModel.collection.insertMany(taskDataSeed))
.then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});

