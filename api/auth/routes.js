const express        = require('express')
const AuthController = require('./controller');

const app = express()

app.post('/', AuthController.Login);

app.get('/renewtoken', AuthController.RenewToken);

module.exports = app