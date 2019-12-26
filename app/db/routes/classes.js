"use strict";
/**
 * The router for `/classes`.
 * Allow for getting classes based on specific criteria.
 */
const express = require("express");
const classes = require("../accessors/classes");
const helpers_1 = require("../helpers");
const router = express.Router();
router.route('/')
    // The catch-all.
    .all((req, res) => {
    const message = helpers_1.createErrorMessage("You must request a specific class with its ID, e.g. '/classes/1234'.");
    res.status(403).json(message);
});
router.route('/:classId')
    // Handle getting of a specific class by its ID.
    .get((req, res) => {
    classes.getClassById(req.params.classId)
        .then((result) => { res.json(helpers_1.createResultMessage(result.rows[0])); })
        .catch((err) => { helpers_1.handleError(err, res); });
});
module.exports = router;
//# sourceMappingURL=classes.js.map