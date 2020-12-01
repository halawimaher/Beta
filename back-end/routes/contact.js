const router = require('express').Router()
import initializeDatabase from '../src/controller'
require('dotenv').config()

const start = async () => {
  const controller = await initializeDatabase()

  //Contact Links
  router.get('/', async (req, res) => {
    try {
      const links = await controller.getContactLinks()
      res.send(
        {
          success: true,
          links
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })


  //Contact Link
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const link = await controller.getLinkByID(id)
      res.send(
        {
          success: true,
          link
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Contact Link
  router.get('/link/new', async (req, res) => {
    try {
      const { facebook_link, youtube_link, twitter_link, email } = req.query
      const link = await controller.createLink(facebook_link, youtube_link, twitter_link, email)
      res.send(
        {
          success: true,
          link
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Contact Link
  router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id
      const link = await controller.deleteLink(id)
      res.send(
        {
          success: true,
          link
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

}
start()

module.exports = router