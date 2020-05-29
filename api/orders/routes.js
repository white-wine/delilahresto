const OrdersController = require('./controller');
const express = require('express')
const mdwAuth = require( '../../middlewares/authentication')
const mdwOrder = require( '../../middlewares/validateOrderStatus')
const app = express()

app.get('/', [mdwAuth.verifyToken], OrdersController.Fetch)

app.get('/:id', [mdwAuth.verifyToken], OrdersController.FetchOne)

app.post('/', mdwAuth.verifyToken, OrdersController.Create);

app.put('/:id', [mdwAuth.verifyToken, mdwAuth.verifyAdmin, mdwOrder.verifyOrderStatus], OrdersController.Update)

app.delete('/:id', [mdwAuth.verifyToken, mdwAuth.verifyAdmin], OrdersController.Delete)

module.exports = app