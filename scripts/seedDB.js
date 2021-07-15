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



const columnsDataSeed = [
    {
        title: 'To Do:',
        taskIds: ['ObjectId("60e8b5a49a34ca7c2037e8bb")', 'ObjectId("60e8b5a49a34ca7c2037e8bc")', 'ObjectId("60e8b5a49a34ca7c2037e8bd")']
    },
    {
        title: 'In Progress',
        taskIds: [],
    },
    {
        title: 'Completed',
        taskIds: [],
    }
];

db.Columns.remove({})
.then(() => db.Columns.collection.insertMany(columnsDataSeed))
.then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
