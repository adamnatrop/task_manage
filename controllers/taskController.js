const { Tasks, UserModel } = require('../models');

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



}