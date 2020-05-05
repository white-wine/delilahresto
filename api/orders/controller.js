const db = require('../../models')
const RESPONSES = require('../../utils/responses')

class OrdersController {
  static Fetch(req, res, next) {
    db.Order.findAndCountAll()
      .then((data) => {
        res.status(200).json({
          ok: true,
          payload: data.rows,
        })
      })
      .catch(err => {
        res.status(500).json({ description: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static FetchOne(req, res) { 
    const id = +req.params.id;
    db.Order.findOne({
        where: {
          id
        }
      })
      .then((order) => {
        if (order === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          });
        } else {
          res.status(200).json({
            ok: true,
            payload: order,
          });
        }
      }).catch(Sequelize.ValidationError, msg => res.status(422).json({
        message: msg.errors[0].message,
      })).catch(err => res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message }));
  }
  static Create(req, res) {
    debugger
    const { 
      UserId,
      products, 
      order_status,
      order_description,
      order_amount,
      payment_method
    } = req.body
    db.sequelize.transaction({ autocommit: false }).then(async(t) => {
      let orderModel = await db.Order.create({
        UserId,
        order_status,
        order_description,
        order_amount,
        payment_method
      }, { transaction: t });
      
      const productOrders = products.map(i => {
          return {
            ProductId: i,
            OrderId: orderModel.id
          }
      });

      await db.ProductOrder.bulkCreate(productOrders,  {
        transaction: t
      }).catch(err => {
        res.status(400).json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      });
      t.commit()
      return orderModel
    }).then((order) => {
      res.status(201).json({
        ok: true,
        order: order,
      })
    })
    .catch(err => {
      res.status(400).json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
    })
  }
  static Update(req, res) {
    const body = req.body
    const id = +req.params.id
    db.Order.update(body, {
        where: {
          id,
        }
      }).then((orderUpdated) => {
        if (orderUpdated === 0) {
          return res.status(404).json({
            ok: false,
            err: 'Order not found',
          });
        }
        res.status(202).json({
          ok: true,
          description: 'Acepted',
        })
      })
      .catch(err => {
        res.status(400).json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
  static Delete(req, res) {
    const id = +req.params.id
    db.Order.destroy({
        where: {
          id,
        }
      }).then((orderUpdated) => {
        if (orderUpdated === 0) {
          return res.status(404).json({
            ok: false,
            err: 'Order not found',
          });
        }
        res.status(200).json({
          ok: true,
          description: 'Deleted',
        })
      }).catch(db.Sequelize.ValidationError, msg => res.status(422).json({
        message: msg.errors[0].message,
      }))
      .catch(err => {
        res.status(400).json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
}

module.exports = OrdersController;