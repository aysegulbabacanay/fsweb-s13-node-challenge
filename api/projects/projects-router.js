// "project" routerını buraya yazın!
const express = require("express");
const {validateProjectId,validateProjects} = require("../projects/projects-middleware");

const Project = require("./projects-model");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: "Gönderiler alınamadı" });
    });
});

router.get("/:id", validateProjectId, (req, res, next) => {
  res.json(req.project);
  next();
});

router.post("/", validateProjects, async (req, res, next) => {
  try {
    const newProject = await Project.insert(req.body)
      res.json(newProject);
  } 
  catch (err) {
    next(err);
  }

});

router.put( "/:id",validateProjects,validateProjectId,async (req, res, next) => {
    try {
      const yeni = await Project.update(req.params.id, req.body);
      res.json(yeni);
    } 
    catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id);
    res.json(req.project);
  } 
  catch (err) {
    next(err);
  }
});



module.exports = router;