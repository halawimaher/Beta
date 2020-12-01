const router = require('express').Router()
import initializeDatabase from '../src/controller'
require('dotenv').config()

const start = async () => {
  const controller = await initializeDatabase()

  //Get all
  router.get('/', async (req, res) => {
    try {
      const about = await controller.getAboutDesc()
      console.log(about)
      res.send(
        {
          success: true,
          about
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })


  //Get by id
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const about = await controller.getAboutByID(id)
      res.send(
        {
          success: true,
          about
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Create
  router.get('/new', async (req, res) => {
    try {
      const { title, about_text } = req.query
      const about = await controller.createAbout(title, about_text)
      res.send(
        {
          success: true,
          about
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Delete
  router.get('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id
      const about = await controller.deleteAbout(id)
      res.send(
        {
          success: true,
          about
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Update
  router.patch('/update/:id', async (req, res) => {
    try {
      const id = req.params.id
      const { title, about_text } = req.body
      const about = await controller.updateAbout(id, title, about_text)
      res.send(
        {
          success: true,
          about
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })
}
start()

module.exports = router