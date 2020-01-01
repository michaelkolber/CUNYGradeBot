"use strict";
/**
 * A series of middlewares for `/search`.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("../helpers/helpers");
const searchService = require("../services/searchService");
/**
 * Validates an incoming search query from the client.
 *
 * @param query The search query from the client.
 * @param res The request's `Response` object.
 */
function _isValidQuery(query, res) {
    if (!query.type || (query.type != 'class' && query.type != 'professor')) {
        helpers.controllers.sendErrorMessage(res, "Search query must contain a 'type': 'class' or 'professor'.", 400);
        return false;
    }
    if (query.type == 'class') {
        if (!(query.course && query.course.department && query.course.number)) {
            helpers.controllers.sendErrorMessage(res, "Class search queries must contain a valid 'course' object, consisting of a 'department' and a 'number'.", 400);
            return false;
        }
        return true;
    }
    // If it's not a class, it must be a professor
    if (!query.lastName) {
        helpers.controllers.sendErrorMessage(res, "Professor search queries must contain a valid 'lastName'.", 400);
        return false;
    }
    return true;
}
/**
 * Only allow POST requests.
 */
function requirePOST(req, res, next) {
    if (req.method !== 'POST') {
        helpers.controllers.sendErrorMessage(res, 'You must use a POST request for this endpoint.', 405);
        return;
    }
    next();
}
exports.requirePOST = requirePOST;
/**
 * Search for classes or professors that meet the given criteria.
 */
function search(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchQuery = req.body;
        if (!_isValidQuery(searchQuery, res))
            return;
        try {
            let result;
            if (searchQuery.type == 'class') {
                result = yield searchService.searchClasses(searchQuery);
            }
            else { // Otherwise the query is for a professor
                result = yield searchService.searchProfessors(searchQuery);
            }
            res.json(helpers.controllers.craftResultMessage(result));
        }
        catch (err) {
            helpers.controllers.handleError(res, err);
        }
    });
}
exports.search = search;
//# sourceMappingURL=searchController.js.map