const express = require('express');
const { handleLogin, handleRegister } = require('../controllers/userController');
const UserRouter = express.Router();
const multer = require('multer')
const upload = multer()

UserRouter
.post('/login', upload.none(), handleLogin)
.post('/register', upload.none(), handleRegister)

module.exports = {
    UserRouter
}