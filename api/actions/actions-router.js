const express = require("express");
const {validateActionsId,validateActions} = require("../actions/actions-middlware");
const ActionsModel = require("./actions-model");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  ActionsModel.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: "Gönderiler alınamadı" });
    });
});

router.get("/:id", validateActionsId, (req, res, next) => {
  res.json(req.actions);
  next();
});

router.post("/", validateActions, async (req, res, next) => {
  try {
    const newAction = await ActionsModel.insert(req.body)
    res.json(newAction)

//aşağıdaki gibi neden olmadı ?
    //    const newAction = await ActionsModel.insert({ 
    //     notes: req.notes,
    //     description: req.description,
    //     project_id: project_id})
    // res.json(newAction)
  
  } catch (err) {
    next(err);
  }
});

router.put("/:id",validateActionsId, validateActions,async (req, res, next) => {
    try {
     const yeni= await ActionsModel.update(req.params.id, req.body);
     res.json(yeni)
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateActionsId, async (req, res, next) => {
  try {
    await ActionsModel.remove(req.params.id);
    res.json(req.actions);
  } catch (err) {
    next(err);
  }
});

// error midleware
router.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
      customMessage: "Birseyler yanlıs gitti",
      message: err.message
    })
    })

module.exports = router;