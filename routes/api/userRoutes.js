const router = require('express').Router();
const userController = require('../../controllers/userController');
const { UserModel } = require("../../models");

// URL PATH /api/user/

// Create New User, Set Session loggedIn: true
router.route('/register')
    .post(userController.register)

//login checks user credentials
router.route('/login')
    .post(userController.login)

router.route('/logout')
    .post(userController.logout)    

router.route('/current-session')
    .get(userController.currentSession)

router.route('/columnsdata')
    .get(userController.getColumns)

module.exports = router;