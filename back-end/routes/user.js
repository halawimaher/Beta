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
      // const salt = bcrypt.genSaltSync(10)
      // const hashedPassword = bcrypt.hashSync(password, salt)
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
      let user = await controller.getUserByUsername(req.body.user, req.body.password)
      console.log(user)
      console.log(user.password)
      console.log(req.body.password)
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const salt = bcrypt.genSaltSync(10)
      const newPassword = bcrypt.hashSync(req.body.password, salt)
      const existPassword = bcrypt.hashSync(user.password, salt)
      console.log(newPassword)
      console.log(existPassword)
      const isMatch = await bcrypt.compare(existPassword, newPassword)
      console.log(isMatch)
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Wrong Credentials' }] });
      } else {
        const payLoad = {
          user: {
            user: user.user
          }
        }
        jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
          if (err) throw err
          res.json({ token })
        })
      }



    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }

  })

  //   function authenticateToken(req, res, next) {
  //     const authHeader = req.headers['authorization']
  //     const token = authHeader && authHeader.split(' ')[1]
  //     if (token == null) return res.sendStatus(401)

  //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //       if (err) return res.sendStatus(403)
  //       req.user = user
  //       next()
  //     })
  //   }

  //   //   const jwt = require('jsonwebtoken');
  //   // require('dotenv/config')

  //   // module.exports = function (req, res, next) {
  //   //   // Get token from header
  //   //   const token = req.header('Authentication');

  //   //   // Check if not token
  //   //   if (!token) {
  //   //     return res.status(401).json({ msg: 'No token, authorization denied' });
  //   //   }

  //   //   // Verify token
  //   //   try {
  //   //     jwt.verify(token, process.env.SECRET, (error, decoded) => {
  //   //       if (error) {
  //   //         return res.status(401).json({ msg: 'Token is not valid' });
  //   //       } else {
  //   //         req.admin = decoded.admin;
  //   //         next();
  //   //       }
  //   //     });
  //   //   } catch (err) {
  //   //     console.error('something wrong with auth middleware');
  //   //     res.status(500).json({ msg: 'Server Error' });
  //   //   }
  //   // };

}
start()

module.exports = router