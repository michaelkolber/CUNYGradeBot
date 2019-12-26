"use strict";
/**
 * The router for `/search`.
 * Allow for getting classes or professors based on specific criteria.
 */
const express = require("express");
const classes_1 = require("../accessors/classes");
const professors_1 = require("../accessors/professors");
const connection = require("../dbConnection");
const helpers_1 = require("../helpers");
const client = connection.client;
const router = express.Router();
/**
 * Validates an incoming search query from the client.
 *
 * @param query The search query from the client.
 * @param res The request's `Response` object.
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
    // If it's not a class, it must be a professor
    if (!query.lastName) {
        helpers_1.sendErrorMessage(res, "Professor search queries must contain a valid 'lastName'.");
        return false;
    }
    return true;
}
router.route('/')
    // Search for classes or professors that meet the given criteria.
    .post((req, res) => {
    const searchQuery = req.body;
    if (!isValidQuery(searchQuery, res))
        return;
    if (searchQuery.type == 'class') {
        classes_1.searchClasses(searchQuery)
            .then((result) => {
            res.json(helpers_1.createResultMessage(result));
        })
            .catch((err) => {
            helpers_1.handleError(err, res);
        });
        return;
    }
    // Otherwise the query is for a professor
    professors_1.searchProfessors(searchQuery)
        .then((result) => {
        res.json(helpers_1.createResultMessage(result));
    })
        .catch((err) => {
        helpers_1.handleError(err, res);
    });
})
    // Catch-all.
    .all((req, res) => {
    const message = helpers_1.createErrorMessage('You must use a POST request for this endpoint.');
    res.status(405).json(message);
});
module.exports = router;
//# sourceMappingURL=search.js.map