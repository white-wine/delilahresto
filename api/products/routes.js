const ProductsController = require('./controller');
const express = require('express')
const db = require('../../models')
const mdw = require( '../../middlewares/authentication')
const RESPONSES = require('../../utils/responses')

const app = express()

app.get('/', ProductsController.Fetch)

app.get('/:id', ProductsController.FetchOne)

app.post('/', [mdw.verifyToken, mdw.verifyAdmin], ProductsController.Create);

app.put('/:id', [mdw.verifyToken, mdw.verifyAdmin], ProductsController.Update);

app.delete('/:id', [mdw.verifyToken, mdw.verifyAdmin], ProductsController.Delete);

module.exports = app