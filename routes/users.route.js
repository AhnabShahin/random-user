const express = require('express');
const router = express.Router();
const _ = require('underscore');
const userController = require('../controllers/users.controller');


/**
* @api {post} /api/user Create user
* @apiName Create new user
* @apiPermission admin
* @apiGroup User
*
* @apiParam  {String} [userName] username
* @apiParam  {String} [email] Email
* @apiParam  {String} [phone] Phone number
* @apiParam  {String} [status] Status
*
* @apiSuccess (200) {Object} mixed `User` object
*/
router.get("/random", userController.randomUser)
router.get("/all", userController.allUser)
router.post("/save", userController.saveUser)
router.patch("/update/:id", userController.updateUser)
router.patch("/bulk-update", userController.bulkUpdate)
router.delete('/delete/:id', userController.deleteUser)
module.exports = router;