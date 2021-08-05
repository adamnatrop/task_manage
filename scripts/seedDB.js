const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/task_manage", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

const columnsDataSeed = [
    {
        title: 'To Do',
        taskIds: [],
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

async function init(){

    await db.Columns.deleteMany({})
            .then(() => db.Columns.collection.insertMany(columnsDataSeed))
            .then(data => {
                console.log(data.result);
                console.log(data.result.n + " records inserted into Columns!");
                //process.exit(0);
            })
            .catch(err => {
                console.error("ERROR", err);
               // process.exit(1);
            });


    await db.Tasks.deleteMany({})
            .then(() => db.Tasks.collection.insertMany(taskDataSeed))

            .then(async data => {
               
                for (let i = 0; i < data.ops.length; i++){
                    console.log(data.ops[i]._id)
                    let taskId = data.ops[i]._id
                    await db.Columns.findOneAndUpdate({title: "To Do"}, {$push: {taskIds: taskId}}, {new: true})
                }
                
                console.log(data.result.n + " records inserted Tasks!");
                process.exit(0);
            })
            .catch(err => {
                console.error(err);
                process.exit(1);
            });

}

init()