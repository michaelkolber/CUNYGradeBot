"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const errors_1 = require("./errors");
// Regular expressions
let classRegexes = {
    'course': /[a-z]+ ?\d{2,4}/,
    'professor': /[a-z]+,?( [a-z]+)?/,
    'section': /sec(tion)? ?\d/,
    'semester': /(f|fall|s|spring) ?'?(\d\d){1,2}/
};
// Middleware to parse a class message. Start with the least ambiguous token and move on from there
function parseClass(ctx, next) {
    console.log('parseClass called'); // DEBUG
    let message = ctx.message.text.toLowerCase();
    let args = {};
    next(ctx);
}
exports.parseClass = parseClass;
/* Extract a specific part of the message, throwing an error if there are multiple matches,
 * or if there are no matches and the argument is required. Otherwise, it adds the argument
 * to an argument list and returns a new string without the match.
 */
function extractArgument(argumentName, message, args, required = false) {
    let matches = message.match(classRegexes[argumentName]);
    if (matches == null) {
        if (required) {
            throw new errors_1.MissingArgumentError(argumentName);
        }
        // TODO: Otherwise, return empty string?
    }
    if (matches.length > 1) {
        throw new TooManyArgumentsError(argumentName, matches);
    }
}
// Middleware to parse a professor message
function parseProfessor(ctx, next) {
    console.log('parseProfessor called'); // DEBUG
    next(ctx);
}
exports.parseProfessor = parseProfessor;
