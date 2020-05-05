const db = require( '../../models')
const RESPONSES = require('../../utils/responses')

class ProductsController {
  static Fetch(req, res, next) {
    db.Product.findAndCountAll()
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
    db.Product.findOne({
        where: {
          id
        }
      })
      .then((product) => {
        if (product === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          });
        } else {
          res.status(200).json({
            ok: true,
            payload: product,
          });
        }
      }).catch(db.Sequelize.ValidationError, msg => res.status(422).json({
        message: msg.errors[0].message,
      })).catch(err => res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message }));
  }
  static Create(req, res) {
    const { product_name, product_price, product_photo } = req.body
    db.Product.create({
        product_name,
        product_price,
        product_photo
      }).then((productSaved) => {
        res.status(201).json({
          ok: true,
          product: productSaved,
        })
      })
      .catch(err => {
        res.status(400).json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
  static Update(req, res) {
    const body = req.body
    const id = +req.params.id
    db.Product.update(body, {
        where: {
          id,
        }
      }).then((productUpdated) => {
        if (productUpdated === 0) {
          res.status(404).json({
            ok: false,
            err: 'Product not found',
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
  static Delete(req, res, next) {
    const id = +req.params.id
    db.Product.destroy({
        where: {
          id,
        }
      }).then((productUpdated) => {
        if (productUpdated === 0) {
          return res.status(404).json({
            ok: false,
            err: 'Product not found',
          });
          
        }
        res.status(200).json({
          ok: true,
          description: 'Deleted',
        })
      }).catch(db.Sequelize.ValidationError, msg => res.status(422).json({
        message: msg.errors[0].message,
      })).catch(err => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message })
      });
  }
}

module.exports = ProductsController;