"use strict";
/**
 * The router for `/search`.
 * Allow for getting classes or professors based on specific criteria.
 */
const express = require("express");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const router = express.Router();
/**
 * Validates an incoming search query from the client.
 */
function isValidQuery(query, res) {
    if (!query.type || (query.type != 'class' && query.type != 'professor')) {
        helpers_1.sendErrorMessage(res, "Search query must contain a 'type': 'class' or 'professor'.");
        return false;
    }
    if (query.type == 'class') {
        if (!(query.course && query.course.department && query.course.number)) {
            helpers_1.sendErrorMessage(res, "Class search queries must contain a valid 'course' object, consisting of a 'department' and a 'number'.");
            return false;
        }
        return true;
    }
    if (!query.lastName) {
        helpers_1.sendErrorMessage(res, "Professor search queries must contain a valid 'lastName'.");
        return false;
    }
    return true;
}
router.route('/')
    .post((req, res) => {
    const query = req.body;
    if (!isValidQuery(query, res))
        return;
    if (query.type == 'class') {
        const filter = { course: query.course };
        if (query.professor)
            filter.professor = query.professor;
        if (query.section)
            filter.section = query.section;
        if (query.semester)
            filter.semester = query.semester;
        models_1.Class.find(filter).populate('professor').populate('course').exec((err, result) => {
            if (err)
                return helpers_1.handleError(err, res);
            helpers_1.createResultMessage(result);
        });
    }
})
    .all((req, res) => {
    const message = helpers_1.createErrorMessage('You must use a POST request for this endpoint.');
    res.status(405).json(message);
});
module.exports = router;
//# sourceMappingURL=search.js.map