"use strict";
/**
 * A CRUD interface for the database's `classes` table.
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
 * Get a class and its corresponding information from the database, using its id.
 *
 * @param id Corresponds to the `id` field in the `classes` table.
 */
function getClassById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        SELECT
            course.department,
            course.number,
            class.semester,
            class.section,
            class.id class_id,
            professor.first_name,
            professor.last_name,
            professor.id professor_id
        FROM
            classes class
        LEFT JOIN
            courses course ON class.course_id = course.id
        LEFT JOIN
            professors professor ON class.professor_id = professor.id
        WHERE
            class.id = $1;`;
        const parameters = [id];
        const result = yield client.query(query, parameters);
        return result.rows[0];
    });
}
exports.getClassById = getClassById;
/**
 * Get all classes with the given criteria from the database.
 *
 * @param searchQuery The original query from the client.
 */
function getClassesByCriteria(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        // Build the query
        let sqlQuery = `
        SELECT
            course.department,
            course.number,
            class.semester,
            class.section,
            class.id class_id,
            professor.first_name,
            professor.last_name,
            professor.id professor_id
        FROM
            classes class
        LEFT JOIN
            courses course ON class.course_id = course.id
        LEFT JOIN
            professors professor ON class.professor_id = professor.id
        WHERE
            course.department = $1
            AND course.number = $2
            `;
        const parameters = [searchQuery.course.department, searchQuery.course.number]; // These are required, so we know they'll be in the search query.
        // Deal with optional parameters
        if (searchQuery.professor) {
            // `.push()` returns the length of the array -- we'll use that to keep track of the parameter number
            sqlQuery += ' AND professor.last_name = $' + parameters.push(searchQuery.professor.lastName);
            if (searchQuery.professor.firstName) {
                sqlQuery += ' AND professor.first_name = $' + parameters.push(searchQuery.professor.firstName);
            }
        }
        if (searchQuery.section)
            sqlQuery += ' AND class.section = $' + parameters.push(searchQuery.section);
        if (searchQuery.semester)
            sqlQuery += ' AND class.semester = $' + parameters.push(searchQuery.semester);
        // Execute the query
        const result = yield client.query(sqlQuery, parameters);
        return result.rows;
    });
}
exports.getClassesByCriteria = getClassesByCriteria;
//# sourceMappingURL=classesAccessor.js.map