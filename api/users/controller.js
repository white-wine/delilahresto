const db = require('../../models')
const RESPONSES = require('../../utils/responses')

class UsersController {
  static Fetch(req, res, next) {
    db.User.findAndCountAll()
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
    db.User.findOne({
        where: {
          id
        }
      })
      .then((user) => {
        if (user === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          });
        } else {
          res.status(200).json({
            ok: true,
            payload: user,
          });
        }
      }).catch(Sequelize.ValidationError, msg => res.status(422).json({
        message: msg.errors[0].message,
      })).catch(err => res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message }));
  }
  static Create(req, res) {
    const { username, firstname, lastname, password, email, address, phone_number, is_admin } = req.body

    db.User.create({
        username,
        firstname,
        lastname,
        password,
        email,
        address,
        phone_number,
        is_admin        
      }).then((userSaved) => {
        res.status(201).json({
          ok: true,
          user: userSaved,
        })
      })
      .catch(err => {
        res.status(400).json({ description: RESPONSES.DB_CONNECTION_ERROR + err })
      })
  }
  static Update(req, res) {
    const body = req.body
    const id = +req.params.id
    db.User.update(body, {
        where: {
          id,
        }
      }).then((userUpdated) => {
        if (userUpdated === 0) {
          return res.status(404).json({
            ok: false,
            err: 'User not found',
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
    db.User.destroy({
        where: {
          id,
        }
      }).then((userUpdated) => {
        if (userUpdated === 0) {
          return res.status(404).json({
            ok: false,
            err: 'User not found',
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

module.exports = UsersController;