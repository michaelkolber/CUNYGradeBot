"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Prettify a result from the server. Map the results to a standard format that can be sent
 * back to the client.
 *
 * @param result The result of the query, straight from the server.
 */
function prettifyClassResult(result) {
    if (result === undefined)
        return null; // If there were no matching results
    if (Array.isArray(result)) { // If we're dealing with an array of results
        if (!result)
            return result;
        const prettified = [];
        for (const res of result) {
            prettified.push(mapFields(res));
        }
        return prettified;
    }
    // Otherwise we're dealing with just one result
    return mapFields(result);
    /**
     * Maps a single class's fields to the format we want to return to the client.
     * @param classResult A single class as returned from the database.
     */
    function mapFields(classResult) {
        const prettified = {
            course: {
                department: classResult.department,
                number: classResult.number,
            },
            professor: {
                firstName: classResult.first_name,
                lastName: classResult.last_name,
                id: classResult.professor_id,
            },
            section: classResult.section,
            semester: classResult.semester,
            id: classResult.class_id,
        };
        return prettified;
    }
}
exports.prettifyClassResult = prettifyClassResult;
/**
 * Prettify a result from the server. Map the results to a standard format that can be sent
 * back to the client.
 *
 * @param result The result of the query, straight from the server.
 */
function prettifyProfessorResult(result) {
    if (result === undefined)
        return null; // If there were no matching results
    if (Array.isArray(result)) { // If we're dealing with an array of results
        if (!result)
            return result;
        const prettified = [];
        for (const res of result) {
            prettified.push(mapFields(res));
        }
        return prettified;
    }
    // Otherwise we're dealing with just one result
    return mapFields(result);
    /**
     * Maps a single professor's fields to the format we want to return to the client.
     * @param professorResult A single professor as returned from the database.
     */
    function mapFields(professorResult) {
        const prettified = {
            firstName: professorResult.first_name,
            lastName: professorResult.last_name,
            id: professorResult.id,
        };
        return prettified;
    }
}
exports.prettifyProfessorResult = prettifyProfessorResult;
//# sourceMappingURL=_serviceHelpers.js.map