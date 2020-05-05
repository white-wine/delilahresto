const express = require('express')
const db = require('./models');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000;
const server = require('http').createServer(app)
const authRoutes = require('./api/auth/routes')
const productsRoutes = require('./api/products/routes')
const usersRoutes = require('./api/users/routes')
const ordersRoutes = require('./api/orders/routes')

// middleware: es una funcion intercepta cada request que llega para
// hacer alguna operacion y luego con next sigo el flujo a la siguiente capa

// add the middleware function
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json(), cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});
app.use('/auth', authRoutes)
app.use('/products', productsRoutes)
app.use('/users', usersRoutes)
app.use('/orders', ordersRoutes)
// app.use(function (user, req, res, next) {
//   res.status(200).send(user);
// });
db.sequelize
  .sync()
  .then((data) => {
    // console.log(data.config);
    console.log(`DB connection has been established successfully: \x1b[32m%s\x1b[0m`, 'online');
  })
  .catch((err) => {
    console.error('Unable to connect to the database DB:', err);
  });

// configuro server
server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server corriendo en el port ${PORT}: \x1b[32m%s\x1b[0m`, 'online');
  }
})
