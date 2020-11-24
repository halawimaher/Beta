import app from './app'
import db from './controller'
import initializeDatabase from './controller'


const port = 8000;

const start = async () => {
  const controller = await initializeDatabase()


  app.get('/', (req, res) => res.send("ok"));

  //Get all 
  //Home
  app.get('/home', async (req, res) => {
    try {
      const homeList = await controller.getHomeList()
      res.send(
        {
          success: true,
          homeList
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Skills
  app.get('/skills', async (req, res) => {
    try {
      const skillList = await controller.getSkillsList()
      res.send(
        {
          success: true,
          skillList
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Experience
  app.get('/experience', async (req, res) => {
    try {
      const expList = await controller.getExperienceList()
      res.send(
        {
          success: true,
          expList
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Projects
  app.get('/projects', async (req, res) => {
    try {
      const projList = await controller.getProjetctsList()
      res.send(
        {
          success: true,
          projList
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //About
  app.get('/about', async (req, res) => {
    try {
      const about = await controller.getAboutDesc()
      res.send(
        {
          success: true,
          about
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Contact Links
  app.get('/contact_links', async (req, res) => {
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


  //Get by ID
  //Skill
  app.get('/skills/:id', async (req, res) => {
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

  //Experience
  app.get('/experience/:id', async (req, res) => {
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

  //Project
  app.get('/projects/:id', async (req, res) => {
    try {
      const id = req.params.id
      const project = await controller.getProjectByID(id)
      res.send(
        {
          success: true,
          project
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //About
  app.get('/about/:id', async (req, res) => {
    try {
      const id = req.params.id
      const about = await controller.getAboutByID(id)
      res.send(
        {
          success: true,
          about
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })

  //Contact Link
  app.get('/contact_links/:id', async (req, res) => {
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

  /* ===================================================================================================== */

  //Create New
  //Skill
  app.get('/skill/new', async (req, res) => {
    try {
      const { name, label, description } = req.query
      const skill = await controller.createSkill(name, label, description)
      res.send(
        {
          success: true,
          skill
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Experience
  app.get('/experience/new', async (req, res) => {
    try {
      const { company_name, from_date, to_date, description } = req.query
      console.log(req.query)
      const experience = await controller.createExperience(company_name, from_date, to_date, description)
      res.send(
        {
          success: true,
          experience
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Project
  app.get('/project/new', async (req, res) => {
    try {
      const { project_name, project_github_link, project_demo_link, description } = req.query
      const project = await controller.createProject(project_name, project_github_link, project_demo_link, description)
      res.send(
        {
          success: true,
          project
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //About
  app.get('/about/new', async (req, res) => {
    try {
      const { title, about_text } = req.query
      const about = await controller.createAbout(title, about_text)
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

  //Home
  app.get('/home/new', async (req, res) => {
    try {
      const { title, description } = req.query
      const home = await controller.createHome(title, description)
      res.send(
        {
          success: true,
          home
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Contact Link
  app.get('/link/new', async (req, res) => {
    try {
      const { facebook_link, youtube_link, twitter_link, email } = req.query
      const link = await controller.createLink(facebook_link, youtube_link, twitter_link, email)
      res.send(
        {
          success: true,
          link
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  /*------------------------------------------------------------------*/
  /*------------------------------------------------------------------*/


  //Delete
  //Skill
  app.delete('/skills/delete/:id', async (req, res) => {
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

  //Experience
  app.delete('/experience/delete/:id', async (req, res) => {
    try {
      const id = req.params.id
      const experience = await controller.deleteExperience(id)
      res.send(
        {
          success: true,
          experience
        });
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Project
  app.delete('/projects/delete/:id', async (req, res) => {
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

  //About
  app.get('/about/delete/:id', async (req, res) => {
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

  //Contact Link
  app.delete('/contact_links/delete/:id', async (req, res) => {
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

  /*------------------------------------------------------------------*/
  /*------------------------------------------------------------------*/


  //Update
  //Skill
  app.patch('/skill/update/:id', async (req, res) => {
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

  //Experience
  app.patch('/experience/update/:id', async (req, res) => {
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
      console.log(error)
      res.status(500).send('Server Error')
    }
  })

  //Project
  app.patch('/project/update/:id', async (req, res) => {
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

  //About
  app.get('/about/update/:id', async (req, res) => {
    try {
      const id = req.params.id
      const { title, about_text } = req.query
      console.log(id)
      console.log(req.query)
      const about = await controller.updateAbout(id, title, about_text)
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

  //Contact Link
  app.patch('/contact_link/update/:id', async (req, res) => {
    try {
      const id = req.params.id
      const { facebook_link, youtube_link, twitter_link, email } = req.query
      const link = await controller.updateLink(id, facebook_link, youtube_link, twitter_link, email)
      res.send(
        {
          success: true,
          link
        });
    } catch (error) {
      res.status(500).send('Server Error')
    }
  })


  /*------------------------------------------------------------------*/
  /*------------------------------------------------------------------*/

  // //Update
  // //Skill
  // app.put('/skills/:id', async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     const skill = await controller.deleteSkill(id)
  //     res.send(
  //       {
  //         success: true,
  //         skill
  //       });
  //   } catch (error) {
  //     res.status(500).send('Server Error')
  //   }
  // })
  // //Experience
  // app.put('/experience/:id', async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     const experience = await controller.deleteExperience(id)
  //     res.send(
  //       {
  //         success: true,
  //         experience
  //       });
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).send('Server Error')
  //   }
  // })
  // //Project
  // app.put('/projects/:id', async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     const project = await controller.deleteProject(id)
  //     res.send(
  //       {
  //         success: true,
  //         project
  //       });
  //   } catch (error) {
  //     res.status(500).send('Server Error')
  //   }
  // })
  // //About
  // app.put('/about/:id', async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     const about = await controller.deleteAbout(id)
  //     res.send(
  //       {
  //         success: true,
  //         about
  //       });
  //   } catch (error) {
  //     res.status(500).send('Server Error')
  //   }
  // })
  // //Contact Link
  // app.put('/contact_links/:id', async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     const link = await controller.deleteLink(id)
  //     res.send(
  //       {
  //         success: true,
  //         link
  //       });
  //   } catch (error) {
  //     res.status(500).send('Server Error')
  //   }
  // })

  app.listen(port, () => console.log('server is listening on port ' + port))
}


start();

