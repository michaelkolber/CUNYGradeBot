"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const classesAccessor = require("../accessors/classesAccessor");
const professorsAccessor = require("../accessors/professorsAccessor");
const helpers = require("../helpers/helpers");
/**
 * Get all classes with the given criteria.
 *
 * @param searchQuery The original query from the client.
 */
function searchClasses(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield classesAccessor.getClassesByCriteria(searchQuery);
        return helpers.services.prettifyClassResult(result);
    });
}
exports.searchClasses = searchClasses;
/**
 * Get all professors with the given criteria.
 *
 * @param searchQuery The original query from the client.
 */
function searchProfessors(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield professorsAccessor.getProfessorsByCriteria(searchQuery);
        return helpers.services.prettifyProfessorResult(result);
    });
}
exports.searchProfessors = searchProfessors;
//# sourceMappingURL=searchService.js.map