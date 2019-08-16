"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to parse a class message. Start with the least ambiguous token and move on from there
function parseClass(ctx, next) {
    console.log('parseClass called');
    next(ctx);
}
exports.parseClass = parseClass;
// Middleware to parse a professor message
function parseProfessor(ctx, next) {
    console.log('parseProfessor called');
    next(ctx);
}
exports.parseProfessor = parseProfessor;
