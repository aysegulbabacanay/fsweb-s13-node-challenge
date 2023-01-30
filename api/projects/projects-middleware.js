// projects ara yazılımları buraya
const Projects = require("../projects/projects-model");


async function validateProjectId(req, res, next) {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Not Found",
      });
    } 
    else {
      req.project = project;
    }
   
next();
}

function validateProjects(req, res, next) {
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({
        message: "gerekli alanlar eksik",
      });
    } 
    else {
      req.name = name;
      req.description = description;
      
    }
    next();
}

module.exports = {
  validateProjectId,
  validateProjects,
};