// eylemlerle ilgili ara katman yazılımları yazın
const Actions = require("../actions/actions-model");


async function validateActionsId(req, res, next) {
    const actions = await Actions.get(req.params.id);
    if (!actions) {
      res.status(404).json({
        message: "Not Found",
      });
    } else {
      req.actions = actions;
    }
    next();
}

function validateActions(req, res, next) {

    const { project_id, description, notes } = req.body;

    if (!notes || !description || !project_id) {
      res.status(400).json({
        message: "gerekli alanlar eksik",
      });
    } 
    else {

        req.notes = notes;
        req.description = description;
        req.project_id = project_id;
      }
      next();
    }


module.exports = {
  validateActionsId,
  validateActions,
};