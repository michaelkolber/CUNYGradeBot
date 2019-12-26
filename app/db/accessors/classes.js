"use strict";
/**
 * A CRUD interface for the database's `classes` collection.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../models");
function getClassById(id, callback) {
    if (!id) {
        throw Error('You must provide an id.');
    }
    return models.Class.findById(id, callback);
}
exports.getClassById = getClassById;
//# sourceMappingURL=classes.js.map