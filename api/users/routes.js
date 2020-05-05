const UsersController = require('./controller');
const express = require('express')
const mdw = require( '../../middlewares/authentication')

const app = express()

app.get('/', [mdw.verifyToken, mdw.verifyAdmin], UsersController.Fetch)

app.get('/:id', [mdw.verifyToken], UsersController.FetchOne)

app.post('/', [mdw.verifyToken, mdw.verifyAdmin], UsersController.Create);

app.put('/:id', [mdw.verifyToken, mdw.verifyAdmin], UsersController.Update);

app.delete('/:id', [mdw.verifyToken, mdw.verifyAdmin], UsersController.Delete);

module.exports = app