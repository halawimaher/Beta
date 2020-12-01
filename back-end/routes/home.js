const router = require('express').Router()
import initializeDatabase from '../src/controller'
require('dotenv').config()

const start = async () => {
  const controller = await initializeDatabase()

  //Get all 
  //Home
  router.get('/', async (req, res) => {
    try {
      const homeList = await controller.getHomeList()
      res.send(
        {
          success: true,
          homeList
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Home
  router.post('/', async (req, res) => {
    try {
      const { title, description } = req.query
      const home = await controller.createHome(title, description)
      res.send(
        {
          success: true,
          home
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

}
start()

module.exports = router