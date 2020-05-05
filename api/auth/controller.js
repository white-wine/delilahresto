const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const node_env = process.env.NODE_ENV || 'development'
const { SEED } = require('../../config/config')[node_env]

class AuthController {
  static Login(req, res) {
    const { body } = req
    db.User.findOne({
        where: {
          username: body.username
        },
        attributes: ['username', 'password', 'is_admin']
      }).then(user => {
        if (!user) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          })
        }
        if (!bcrypt.compareSync(body.password, user.password)) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          })
        }
        // Crear un token
        // expira en 4hs
        user.password = ':P'
        const access_token = jwt.sign({ user: user }, SEED, { expiresIn: 14400 })

        res.status(200).json({
          ok: true,
          user: user,
          access_token,
          id: user.id
        })
      })
      .catch(err => {
        res.status(400).json({ message: 'issues trying to connect to database' + err, err })
      })
  }

  static RenewToken(req, res) {
    const token = jwt.sign({ user: req.user }, SEED, { expiresIn: 14400 })
    res.status(200).json({
      ok: true,
      token,
    })
  }
}

module.exports = AuthController