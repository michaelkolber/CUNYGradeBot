"use strict";
/**
 * A series of middlewares for `/classes`.
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
const professorsService = require("../services/professorsService");
/**
 * Deny access to the root path.
 */
function denyRootPath(req, res) {
    helpers.controllers.sendErrorMessage(res, "You must request a specific professor with its ID, e.g. '/professors/1234'.", 403);
}
exports.denyRootPath = denyRootPath;
/**
 * Get a single professor using its id.
 */
function getProfessorById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield professorsService.getProfessorById(req.params.professorId);
            res.json(helpers.controllers.craftResultMessage(result));
        }
        catch (err) {
            helpers.controllers.handleError(res, err);
        }
    });
}
exports.getProfessorById = getProfessorById;
//# sourceMappingURL=professorsController.js.map