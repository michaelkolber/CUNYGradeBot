// Imports
import {MissingArgumentError, ParserError, TooManyArgumentsError, ValueError} from './errors';

// Regular expressions
const classRegexes = {
    course: /\b[a-z]+ ?\d{2,4}\b/g,
    professor: /\b[a-z]+,?( [a-z]+)?\b/g,
    section: /\bsec(tion)? ?[a-z\d]+\b/g,
    semester: /\b(fall|spring|f|s) ?'?(\d\d){1,2}\b/g,
};


// Middleware to parse a class message. Start with the least ambiguous token and move on from there
function parseClassMessage(ctx) {
    console.log('parseClassMessage called');  // DEBUG
    
    // Take a substring to exclude the `/class ` command at the beginning
    let message: string = ctx.message.text.toLowerCase().substring(7);
    let parsedArguments = {};  // tslint:disable-line:prefer-const
    
    // TODO: Handle all errors
    
    // Parse the arguments from least to most ambiguous.
    try {
        message = extractArgument('section', message, parsedArguments);
        message = extractArgument('semester', message, parsedArguments);
        message = extractArgument('course', message, parsedArguments, true);
        message = extractArgument('professor', message, parsedArguments);
    } catch (error) {
        ctx.reply(error.toString());
        return;
    }
    
    ctx.reply(JSON.stringify(parsedArguments, null, 2));
}

/**
 * Extract a specific argument and its value from the message, throwing an error if there
 * are multiple matches, or if there are no matches and the argument is required. Otherwise,
 * it adds the argument to an argument list and returns a new string without the matched text.
 */
function extractArgument(parameterName: string, message: string, parsedArguments: object, required = false) {
    // TODO: Write a test that could trip up this function. E.g. The first initial could be F, which could be parsed as fall semester.
    let matches = message.match(classRegexes[parameterName]);
    if (matches == null) {
        if (required) {  // If the argument is required
            throw new MissingArgumentError(parameterName);
        }
        // Otherwise, mark it as not there.
        parsedArguments[parameterName] = null;
        return message;
    }
    
    if (matches.length > 1) {
        throw new TooManyArgumentsError(parameterName, matches);
    }
    
    let argumentValue: string|object;
    
    if (parameterName == 'course')
        argumentValue = parseCourse(matches[0]);
    else if (parameterName == 'professor')
        argumentValue = parseProfessor(matches[0]);
    else if (parameterName == 'section')
        argumentValue = parseSection(matches[0]);
    else if (parameterName == 'semester')
        argumentValue = parseSemester(matches[0]);
    else
        throw new ValueError('parameterName', parameterName, ['course', 'professor', 'section', 'semester']);
    
    parsedArguments[parameterName] = argumentValue;
    
    return message.replace(matches[0], '').trim();
}

/**
 * Parse a string that contains a course, consisting of a department name and a number.
 * Valid formats are:
 * - [Department CourseNumber] - E.g. CSCI 111
 * - [Department|CourseNumber] - E.g. ANTH201
 */
function parseCourse(input: string) {
    const department = input.match(/[a-z]+/);
    const courseNumber = input.match(/\d+\w+?/);
    
    // Validation
    if (department == null || department.length > 1 || courseNumber == null || courseNumber.length > 1) {
        let additionalInfo: string;
        if (department == null && courseNumber)
            additionalInfo = `Could not find a valid department; courseNumber was '${courseNumber}'.`;
        else if (courseNumber == null && department)
            additionalInfo = `Could not find a valid courseNumber; department was '${department}'.`;
        else
            additionalInfo = 'Both department and courseNumber failed to find a match.';
        
        throw new ParserError(input, additionalInfo);
    }
    
    return {department: department[0], courseNumber: courseNumber[0]};
}

/**
 * Parse a string that contains a professor, consisting of a last name and optionally a first name/initial.
 * Valid formats are:
 * - [Lastname]
 * - [FirstInitial Lastname]
 * - [Lastname, FirstInitial]
 * - [Firstname Lastname]
 * - [Lastname, Firstname]
 */
function parseProfessor(input: string) {
    let lastName: string;
    let firstInitial: string|null;
    
    let parts: string[];
    
    if (input.indexOf(',') != -1) {
        parts = input.split(',');
        lastName = parts[0].trim();  // To account for spaces before the comma
        firstInitial = parts[1].trim().charAt(0);  // To account for space(s) after the comma
    } else if (input.indexOf(' ') != -1) {
        parts = input.split(' ');
        firstInitial = parts[0].trim().charAt(0);  // Trim to account for extra whitespace between the names
        lastName = parts[1].trim();
    } else {
        lastName = input;
        firstInitial = null;
    }
    
    return {lastName, firstInitial};
}

/**
 * Parse a string that contains a section, consisting of a keyword and a section number.
 * Valid formats are:
 * - [Sec|SectionNumber] - E.g. sec23
 * - [Sec SectionNumber] - E.g. Sec 5
 * - [Section|SectionNumber] - E.g. section7
 * - [Section SectionNumber] - E.g. section 2
 */
function parseSection(input: string) {
    let section: string;
    
    if (input.indexOf(' ') != -1) {
        section = input.split(' ')[1].trim();  // Trim to account for multiple spaces between the words
    } else if (input.indexOf('section') == 0) {
        section = input.substring(7);
    } else if (input.indexOf('sec') == 0) {
        section = input.substring(3);
    } else {
        throw new ParserError(input, 'section', "Could not find a space, 'section', or 'sec' in the string.");
    }
    
    return section;
}

/**
 * Parse a string that contains a semester, consisting of a season and a year.
 * Creates a string in the format of 'Season Year', e.g. 'Spring 2019'.
 * 
 * Valid formats follow the following pattern: s[emester][ ]['][YY]YY
 * 
 * This expands to, for example:
 * - F19
 * - Fall19
 * - F 19
 * - Fall 19
 * - F'19
 * - Fall'19
 * - F '19
 * - Fall '19
 * - F2019
 * - Fall2019
 * - F 2019
 * - Fall 2019
 */
function parseSemester(input: string) {
    let semester: string;
    
    let tempSeason: string;
    let tempYear: string;
    
    // Parse the tokens
    const seasonMatches = input.match(/fall|spring|f|s/);
    if (seasonMatches == null) {
        throw new ParserError(input, 'semester', "Could not find an instance of 's', 'spring', 'f', or 'fall' in input string.");
    }
    tempSeason = seasonMatches[0];
    
    tempYear = input.replace(tempSeason, '').replace("'", '').trim();
    if (tempYear.match(/^\d\d(\d\d)?$/) == null) {
        throw new ParserError(input, 'semester', `Could not extract a valid 2- or 4-digit year from remaining string '${tempYear}'.`);
    }
    
    // Join the tokens
    switch (tempSeason) {
        case 's':
        case 'spring':
            tempSeason = 'Spring';
            break;
        case 'f':
        case 'fall':
            tempSeason = 'Fall';
    }
    
    switch (tempYear.length) {
        case 2:
            tempYear = '20' + tempYear;
            break;
    }
    
    semester = `${tempSeason} ${tempYear}`;
    
    
    return semester;
}


// Middleware to parse a professor message
function parseProfessorMessage(ctx, next) {
    console.log('parseProfessor called'); // DEBUG
    
    next(ctx);
}

export {parseClassMessage, parseProfessorMessage};
