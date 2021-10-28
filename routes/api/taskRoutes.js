const router = require('express').Router();
const taskController = require('../../controllers/taskController');
const { Tasks } = require("../../models");

// URL PATH /api/task/

router.route('/')
    .get(taskController.findAll)
    .post(taskController.create)

router.route('/:id')
    .get(taskController.findById)
    .put(taskController.update)
    .delete(taskController.remove);

router.route('/taskid')
    .post(taskController.updateColumnWithTaskId);

router.route('/columnstate')
    .post(taskController.updateColumnState);
// router.route('/task')
//     .post(taskController.addTask)
//     .get(taskController.findAllWithTasks)

module.exports = router;