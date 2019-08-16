// Middleware to parse a class message. Start with the least ambiguous token and move on from there
function parseClass(ctx, next) {
    
    next(ctx);
}


// Middleware to parse a professor message
function parseProfessor(ctx, next) {
    
    next(ctx);
}

export {parseClass, parseProfessor};