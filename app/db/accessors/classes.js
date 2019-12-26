"use strict";
/**
 * A CRUD interface for the database's `classes` table.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const connection = require("../dbConnection");
const client = connection.client;
/**
 * Get a class and its corresponding information using its id.
 *
 * @param id Corresponds to the `id` field in the `classes` table.
 */
function getClassById(id) {
    // checkForClient();
    if (!id) {
        throw Error('You must provide an id.');
    }
    return client.query(`SELECT
            course.department,
            course.number,
            class.semester,
            class.section,
            professor.first_name,
            professor.last_name
        FROM
            classes class
        LEFT JOIN
            courses course ON class.course_id = course.id
        LEFT JOIN
            professors professor ON class.professor_id = professor.id
        WHERE
            class.id = $1;`, [id]);
}
exports.getClassById = getClassById;
//# sourceMappingURL=classes.js.map