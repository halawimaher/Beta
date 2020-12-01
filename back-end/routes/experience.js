const router = require('express').Router()
import initializeDatabase from '../src/controller'
require('dotenv').config()

const start = async () => {
  const controller = await initializeDatabase()

  //Experience
  router.get('/', async (req, res) => {
    try {
      const expList = await controller.getExperienceList()
      res.send(
        {
          success: true,
          expList
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })


  //Experience
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const experience = await controller.getExperienceByID(id)
      res.send(
        {
          success: true,
          experience
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Experience
  router.get('/new', async (req, res) => {
    try {
      const { company_name, from_date, to_date, description } = req.query
      const experience = await controller.createExperience(company_name, from_date, to_date, description)
      res.send(
        {
          success: true,
          experience
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Experience
  router.delete('delete/:id', async (req, res) => {
    try {
      const id = req.params.id
      const experience = await controller.deleteExperience(id)
      res.send(
        {
          success: true,
          experience
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Experience
  router.patch('/update/:id', async (req, res) => {
    try {
      const id = req.params.id
      const { company_name, from_date, to_date, description } = req.query
      const experience = await controller.updateExperience(id, company_name, from_date, to_date, description)
      res.send(
        {
          success: true,
          experience
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

}
start()

module.exports = router