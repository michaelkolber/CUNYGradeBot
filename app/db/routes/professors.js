"use strict";
/**
 * The router for `/professors`.
 * Allow for getting professors based on specific criteria.
 */
const express = require("express");
const professors = require("../accessors/professors");
const helpers_1 = require("../helpers");
const router = express.Router();
router.route('/')
    // The catch-all.
    .all((req, res) => {
    const message = helpers_1.createErrorMessage("You must request a specific professor with its ID, e.g. '/professors/1234'.");
    res.status(403).json(message);
});
router.route('/:professorId')
    // Handle getting of a specific professor by its ID.
    .get((req, res) => {
    professors.getProfessorById(req.params.professorId)
        .then((result) => { res.json(helpers_1.createResultMessage(result)); })
        .catch((err) => { helpers_1.handleError(err, res); });
});
module.exports = router;
//# sourceMappingURL=professors.js.map