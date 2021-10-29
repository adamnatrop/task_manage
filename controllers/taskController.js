const { Tasks, UserModel, Columns } = require('../models');

module.exports = {

    findAll: function(req, res) {
        Tasks
            .find(req.query)
            .then(taskData => res.json(taskData))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        Tasks
            .findById(req.params.id)
            .populate("tasks")
            .then(taskData => res.json(taskData))
            .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        Tasks
            .create(req.body)
            .then(taskData => res.json(taskData))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        Tasks
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(taskData => res.json(taskData))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        Tasks
            .findById({_id: req.params.id})
            .then(taskData => taskData.remove())
            // .then(taskData => res.json(taskData))
            // .catch(err => res.status(422).json(err));
        Columns 
            .findOneAndUpdate({taskIds: req.params.id}, {$pull: {taskIds: req.params.id}})
            //.then(taskData => taskData.remove())

            .then(taskData => res.json(taskData))
            .catch(err => res.status(422).json(err));
    },
    addTask: function(req, res) {
        console.log("Controller", req.body)
        Tasks
            .create(req.body)
            .then(({ _id}) => UserModel.findOneAndUpdate({_id: req.body.task}, {$push: {tasks: _id} }, {new :true}))
            .then(taskData => res.json(taskData))
            .catch(err => res.json(err))
    }, 
    findAllWithTasks: function(req, res) {
        Tasks
            .find(req.query)
            .populate("tasks")
            .then(tasksData => res.json(tasksData))
            .catch(err => res.status(422).json(err));
    },
    updateColumnWithTaskId: function(req, res){
        console.log("Controller TaskId", req.body.taskId)
       Columns
            .findOneAndUpdate({_id: req.body.columnId}, {$push: {taskIds: req.body.taskId}}, {new: true})
            .then(taskData => res.json(taskData))
            .catch(err => res.status(422).json(err));
    },
    updateColumnState: async function(req, res){
        console.log('Controller - Update Column State', req.body)
        Columns
            .findOneAndUpdate({_id: req.body.destinationColumnId}, {$push: {taskIds: req.body.taskId} }, {new: true})
            .then(() => Columns.findOneAndUpdate({_id: req.body.sourceColumnId}, {$pull: {taskIds: req.body.taskId}}))
            .then(taskData => res.json(taskData))
            .catch(err => res.status(422).json(err));
    }


}