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
const professorsAccessor = require("../accessors/professorsAccessor");
const helpers = require("../helpers/helpers");
/**
 * Get a professor and its corresponding information using its id.
 *
 * @param id Corresponds to the `id` field in the `professors` table.
 */
function getProfessorById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw Error('You must provide an id.');
        }
        const result = yield professorsAccessor.getProfessorById(id);
        return helpers.services.prettifyProfessorResult(result);
    });
}
exports.getProfessorById = getProfessorById;
//# sourceMappingURL=professorsService.js.map