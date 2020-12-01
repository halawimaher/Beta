const router = require('express').Router()
import initializeDatabase from '../src/controller'
require('dotenv').config()

const start = async () => {
  const controller = await initializeDatabase()


  router.get('/', async (req, res) => {
    try {
      const projList = await controller.getProjectsList()
      res.send(
        {
          success: true,
          projList
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Project
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const project = await controller.getProjectByID(id)
      res.send(
        {
          success: true,
          project
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Project
  router.post('/', async (req, res) => {
    try {
      const { project_name, project_github_link, project_demo_link, description } = req.query
      const project = await controller.createProject(project_name, project_github_link, project_demo_link, description)
      res.send(
        {
          success: true,
          project
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Project
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const project = await controller.deleteProject(id)
      res.send(
        {
          success: true,
          project
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Project
  router.patch('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const { project_name, project_github_link, project_demo_link, description } = req.query
      const project = await controller.updateProject(id, project_name, project_github_link, project_demo_link, description)
      res.send(
        {
          success: true,
          project
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

}
start()

module.exports = router