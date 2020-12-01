const router = require('express').Router()
import initializeDatabase from '../src/controller'
require('dotenv').config()

const start = async () => {
  const controller = await initializeDatabase()

  //Skills
  router.get('/', async (req, res) => {
    try {
      const skillList = await controller.getSkillsList()
      res.send(
        {
          success: true,
          skillList
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Get by ID
  //Skill
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const skill = await controller.getSkillsByID(id)
      res.send(
        {
          success: true,
          skill
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Create New
  //Skill
  router.post('/', async (req, res) => {
    try {
      const { name, label, description } = req.query
      const skill = await controller.createSkill(name, label, description)
      res.send(
        {
          success: true,
          skill
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Delete
  //Skill
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const skill = await controller.deleteSkill(id)
      res.send(
        {
          success: true,
          skill
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Update
  //Skill
  router.patch('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const { name, label, description } = req.query
      const skill = await controller.updateSkill(id, name, label, description)
      res.send(
        {
          success: true,
          skill
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })


}
start()

module.exports = router