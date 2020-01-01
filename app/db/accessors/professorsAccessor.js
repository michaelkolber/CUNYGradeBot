"use strict";
/**
 * A CRUD interface for the database's `professors` table.
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
const connection = require("../dbConnection");
const client = connection.client;
/**
 * Get a professor and its corresponding information using its id.
 *
 * @param id Corresponds to the `id` field in the `professors` table.
 */
function getProfessorById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        SELECT
            first_name,
            last_name,
            id
        FROM
            professors
        WHERE
            id = $1;`;
        const parameters = [id];
        const result = yield client.query(query, parameters);
        return result.rows[0];
    });
}
exports.getProfessorById = getProfessorById;
/**
 * Search the professors with the given criteria.
 *
 * @param searchQuery The original query from the client.
 */
function getProfessorsByCriteria(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        // Build the query
        let sqlQuery = `SELECT
                        first_name,
                        last_name,
                        id
                    FROM
                        professors
                    WHERE
                        last_name = $1
                        `;
        const parameters = [searchQuery.lastName]; // The last name is required, so we know it will be in the search query.
        // Deal with optional parameters
        if (searchQuery.firstName) {
            sqlQuery += 'AND last_name = $2';
            parameters.push(searchQuery.firstName);
        }
        // Execute the query
        const result = yield client.query(sqlQuery, parameters);
        return result.rows;
    });
}
exports.getProfessorsByCriteria = getProfessorsByCriteria;
//# sourceMappingURL=professorsAccessor.js.map