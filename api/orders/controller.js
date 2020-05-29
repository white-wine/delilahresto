const db = require('../../models')
const RESPONSES = require('../../utils/responses')
const { Op } = db.Sequelize
class OrdersController {
  static Fetch(req, res, next) {
    let where = null
    if (req.user.is_admin === 0) {
      where = {
        UserId: req.user.id,
      }
    }
    db.Order.findAll({
      where: where,
      include: [
        {
          model: db.User,
          attributes: ['id', 'username', 'firstname', 'lastname', 'email', 'address', 'phone_number']
        }, {
          model: db.Product,
          as: 'products',
          attributes: ['id', 'product_name', 'product_price', 'product_photo']
        }
      ]
    })
      .then((data) => {
        res.status(200).json({
          ok: true,
          orders: data,
        })
      })
      .catch((err) => {
        res
          .status(500)
          .json({ description: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static FetchOne(req, res) {
    const id = +req.params.id
    let where = null
    if (req.user.is_admin === 0) {
      where = {
        UserId: req.user.id,
      }
    }
    db.Order.findAll({
      where: where,
      include: [
        {
          model: db.User,
          attributes: ['id', 'username', 'firstname', 'lastname', 'email', 'address', 'phone_number']
        }, {
          model: db.Product,
          as: 'products',
          attributes: ['id', 'product_name', 'product_price', 'product_photo']
        }
      ]
    })
      .then((order) => {
        if (order === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            ok: true,
            payload: order,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({
          message: msg.errors[0].message,
        }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message }),
      )
  }
  static Create(req, res) {
    const {
      products,
      order_status,
      order_description,
      payment_method,
    } = req.body
    const UserId = req.user.id
    db.sequelize
      .transaction({ autocommit: false })
      .then(async (t) => {
        // obtengo el modelo de todos los productos que mande en mi orden
        const productModel = await db.Product.findAll(
          {
            where: {
              id: {
                [Op.in]: products.map((i) => i.id),
              },
            },
          },
          { transaction: t },
        )
        // calculo la suma de todos los productos a traves del precio unitario de cada producto
        let order_amount = productModel.reduce(
          (acum, b) => acum + +b.product_price,
          0,
        )

        // creo una orden
        const orderModel = await db.Order.create(
          {
            UserId,
            order_status,
            order_description,
            order_amount,
            payment_method,
          },
          {
            transaction: t,
          },
        )

        // preparo la tabla asociativa
        const productOrders = products.map((i) => {
          return {
            ProductId: i.id,
            OrderId: orderModel.id,
            product_quantity: i.product_quantity,
          }
        })
        // grabo en la tabla asociativa
        await db.ProductOrder.bulkCreate(productOrders, {
          transaction: t,
        }).catch((err) => {
          res
            .status(400)
            .json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
        })
        t.commit()
        return orderModel
      })
      .then((order) => {
        res.status(201).json({
          ok: true,
          order_sent: order,
        })
      })
      .catch((err) => {
        res
          .status(400)
          .json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
  static Update(req, res) {
    const body = req.body
    const id = +req.params.id
    db.Order.update(body, {
      where: {
        id,
      },
    })
      .then(async (orderUpdated) => {
        const orderModel = await db.Order.findOne({
          where: { id: id },
        })
        if (!orderModel) {
          return res.status(404).json({
            ok: false,
            err: 'Order not found',
          })
        }
        res.status(202).json({
          ok: true,
          description: 'Acepted',
          order_uploaded: orderModel,
        })
      })
      .catch((err) => {
        res
          .status(400)
          .json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
  static Delete(req, res) {
    const id = +req.params.id
    db.Order.destroy({
      where: {
        id,
      },
    })
      .then((orderUpdated) => {
        if (orderUpdated === 0) {
          return res.status(404).json({
            ok: false,
            err: 'Order not found',
          })
        }
        res.status(200).json({
          ok: true,
          description: 'Deleted',
        })
      })
      .catch(db.Sequelize.ValidationError, (msg) =>
        res.status(422).json({
          message: msg.errors[0].message,
        }),
      )
      .catch((err) => {
        res
          .status(400)
          .json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
}

module.exports = OrdersController
