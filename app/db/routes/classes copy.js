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
    .all((req, res) => {
    const message = helpers_1.createErrorMessage("You must request a specific class with its ID, e.g. '/classes/1234'.");
    res.status(403).json(message);
});
router.route('/:classId')
    .get((req, res) => {
    classes.getClassById(req.params.classId, (err, result) => {
        if (err)
            return helpers_1.handleError(err, res);
        const message = {
            ok: true,
            result,
        };
        res.json(message);
    });
});
module.exports = router;
//# sourceMappingURL=classes copy.js.map