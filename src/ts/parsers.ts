// Regular expressions
let classRegexes = {
    'course': /[a-z]+ ?\d{2,4}/,
    'professor': /[a-z]+,?( [a-z]+)?/,
    'section': /sec(tion)? ?\d/,
    'semester': /(f|fall|s|spring) ?'?(\d\d){1,2}/
}


// Middleware to parse a class message. Start with the least ambiguous token and move on from there
function parseClass(ctx, next) {
    console.log('parseClass called');
    next(ctx);
}


// Middleware to parse a professor message
function parseProfessor(ctx, next) {
    console.log('parseProfessor called');
    next(ctx);
}

export {parseClass, parseProfessor};