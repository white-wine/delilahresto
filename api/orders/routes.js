const OrdersController = require('./controller');
const express = require('express')
const mdw = require( '../../middlewares/authentication')

const app = express()

app.get('/', OrdersController.Fetch)

app.get('/:id', OrdersController.FetchOne)

app.post('/', mdw.verifyToken, OrdersController.Create);

app.put('/:id', mdw.verifyToken, OrdersController.Update);

app.delete('/:id', [mdw.verifyToken, mdw.verifyAdmin], OrdersController.Delete);

module.exports = app