const router = require('express').Router()
import initializeDatabase from '../src/controller'
require('dotenv').config()

const start = async () => {
  const controller = await initializeDatabase()

  const bcrypt = require('bcryptjs')

  const jwt = require('jsonwebtoken')

  router.get('/register', async (req, res) => {
    try {
      const { user, password } = req.body
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)
      const userList = await controller.createUser(user, hashedPassword)
      res.send(
        {
          success: true,
          userList
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await controller.getUserByUsername(username)
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Wrong Credentials' }] });
      }
      const payLoad = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) throw err
        res.json({ token })
      })

    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }

  })
}
start()

module.exports = router