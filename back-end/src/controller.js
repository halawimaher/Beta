import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const initializeDatabase = async () => {
  try {
    const db = await open({
      filename: 'db.sqlite',
      driver: sqlite3.Database
    })

    //Query all
    //Home
    const getHomeList = async () => {
      const rows = await db.all("SELECT id, title, description FROM Home")
      return rows
    }

    //Skills
    const getSkillsList = async () => {
      const rows = await db.all("SELECT id, label, description, image FROM Skills")
      return rows
    }

    //Experience
    const getExperienceList = async () => {
      const rows = await db.all("SELECT id, role, company, start, end FROM Experience")
      return rows
    }

    //Projects
    const getProjetctsList = async () => {
      const rows = await db.all("SELECT id, name, github_link, demo_link, description, image FROM Projects")
      return rows
    }

    //About
    const getAboutDesc = async () => {
      const rows = await db.all("SELECT id, title, about_text FROM About")
      return rows
    }

    //Contact Links
    const getContactLinks = async () => {
      const rows = await db.all("SELECT id, facebook_link, youtube_link, twitter_link, email FROM Contact_Links")
      return rows
    }


    /*------------------------------------------------------------------*/
    /*------------------------------------------------------------------*/


    //Query by ID
    //SKills
    const getSkillsByID = async (id) => {
      const rows = await db.all(`SELECT id, name, label, description FROM skills WHERE id=${id}`)
      return rows
    }

    //Experience
    const getExperienceByID = async (id) => {
      const rows = await db.all(`SELECT id, role, company, start, end FROM experience WHERE id=${id}`)
      return rows
    }

    //Projects
    const getProjectByID = async (id) => {
      const rows = await db.all(`SELECT id, name, github_link, demo_link, description, image  FROM projects WHERE id=${id}`)
      return rows
    }

    //About
    const getAboutByID = async (id) => {
      const rows = await db.all(`SELECT id, title, title_description FROM about WHERE id=${id}`)
      return rows
    }

    //Contact Links
    const getLinkByID = async (id) => {
      const rows = await db.all(`SELECT id, facebook_link, youtube_link, twitter_link, email FROM contact_links WHERE id=${id}`)
      return rows
    }


    /*------------------------------------------------------------------*/
    /*------------------------------------------------------------------*/


    //Create New
    //Skill
    const createSkill = async (name, label, description, image) => {
      const rows = await db.run(`INSERT INTO Skills (name, label, description, image) VALUES ("${name}", "${label}", "${description}"), "${image}"`)
      return rows.lastID
    }

    //Experience
    const createExperience = async (name, start, end) => {
      const rows = await db.run(`INSERT INTO Experience (name, start, end, tasks, tech_used) VALUES ("${name}", "${start}", "${end}")`)
      return rows
    }

    //Project
    const createProject = async (name, github_link, demo_link, description, image) => {
      const rows = await db.run(`INSERT INTO Projects (name, github_link, demo_link, description) VALUES ("${name}", "${github_link}", "${demo_link}", "${description}", "${image}")`)
      return rows
    }

    //About
    const createAbout = async (title, about_text) => {
      const rows = await db.run(`INSERT INTO About (title, about_text) VALUES ("${title}", "${about_text}")`)
      return rows
    }

    //Home
    const createHome = async (title, description) => {
      const rows = await db.run(`INSERT INTO Home (title, description) VALUES ("${title}", "${description}")`)
      return rows
    }

    //Link
    const createLink = async (facebook_link, youtube_link, twitter_link, email) => {
      const rows = await db.run(`INSERT INTO Contact_Links (facebook_link, youtube_link, twitter_link, email) VALUES ("${facebook_link}", "${youtube_link}", "${twitter_link}", "${email}")`)
      return rows
    }


    /*------------------------------------------------------------------*/
    /*------------------------------------------------------------------*/


    //Delete
    //SKills
    const deleteSkill = async (id) => {
      const rows = await db.run(`DELETE FROM Skills WHERE id=${id}`)
      return rows
    }

    //Experience
    const deleteExperience = async (id) => {
      const rows = await db.run(`DELETE FROM Experience WHERE id=${id}`)
      return rows
    }

    //Projects
    const deleteProject = async (id) => {
      const rows = await db.run(`DELETE FROM Projects WHERE id=${id}`)
      return rows
    }

    //About
    const deleteAbout = async (id) => {
      const rows = await db.run(`DELETE FROM About WHERE id=${id}`)
      return rows
    }

    //Contact Links
    const deleteLink = async (id) => {
      const rows = await db.run(`DELETE FROM Contact_Links WHERE id=${id}`)
      return rows
    }

    /*------------------------------------------------------------------*/
    /*------------------------------------------------------------------*/


    //update
    //SKills
    const updateSkill = async (id, name, label, description) => {
      const rows = await db.run(`UPDATE Skills
      SET name = '${name}', label = '${label}', description = '${description}'
      WHERE id=${id}`)
      return rows
    }

    //Experience
    const updateExperience = async (id, name, start, end) => {
      const rows = await db.run(`UPDATE Experience
      SET name = '${name}', start = ${start}, end = '${end}' WHERE id=${id}`)
      return rows
    }

    //Projects
    const updateProject = async (id, name, github_link, demo_link, description, image) => {
      const rows = await db.run(`UPDATE Projects
      SET name = '${name}', github_link = '${github_link}', demo_link = '${demo_link}', description = '${description}', '${image}'
      WHERE id=${id}`)
      return rows
    }

    //About
    const updateAbout = async (id, title, about_text) => {
      console.log(id, title, about_text)
      const rows = await db.run(`UPDATE About
      SET title = '${title}', about_text = '${about_text}' WHERE id=${id}`)
      return rows
    }

    //Contact Links
    const updateLink = async (id, facebook_link, youtube_link, twitter_link, email) => {
      const rows = await db.run(`UPDATE Contact_Links
      SET facebook_link = '${facebook_link}', youtube_link = '${youtube_link}', twitter_link = '${twitter_link}', email = '${email}'
      WHERE id=${id}`)
      return rows
    }

    const controller = {
      getHomeList,
      getSkillsList,
      getExperienceList,
      getProjetctsList,
      getAboutDesc,
      getContactLinks,
      getSkillsByID,
      getExperienceByID,
      getProjectByID,
      getAboutByID,
      getLinkByID,
      createSkill,
      createExperience,
      createProject,
      createAbout,
      createHome,
      createLink,
      deleteSkill,
      deleteExperience,
      deleteProject,
      deleteAbout,
      deleteLink,
      updateAbout,
      updateSkill,
      updateExperience,
      updateProject,
      updateLink
    }

    return controller;
  }




  //Creating Table
  // await db.run(`CREATE TABLE Home (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL)`);
  // await db.run(`CREATE TABLE About (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL,  about_text TEXT NOT NULL)`);
  // await db.run(`CREATE TABLE Skills (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, label TEXT NOT NULL, description TEXT NOT NULL)`);
  // await db.run(`CREATE TABLE Experience (id INTEGER PRIMARY KEY AUTOINCREMENT, company_name TEXT NOT NULL, from_date DATE NOT NULL, to_date DATE NOT NULL, tasks TEXT NOT NULL, tech_used TEXT NOT NULL)`);
  // await db.run(`CREATE TABLE Experience_Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT NOT NULL)`);
  // await db.run(`CREATE TABLE Experience_Tech (id INTEGER PRIMARY KEY AUTOINCREMENT, technology TEXT NOT NULL)`);
  // await db.run(`CREATE TABLE Projects (id INTEGER PRIMARY KEY AUTOINCREMENT, project_name TEXT NOT NULL, project_github_link TEXT NOT NULL, project_demo_link TEXT NOT NULL, project_image FILE, description TEXT NOT NULL)`);
  // await db.run(`CREATE TABLE Contact_Links (id INTEGER PRIMARY KEY AUTOINCREMENT, facebook_link TEXT NOT NULL, twitter_link TEXT NOT NULL, youtube_link TEXT NOT NULL, email TEXT NOT NULL)`);


  catch (error) {
    console.log(error)
  }
}

export default initializeDatabase

