"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingArgumentError extends Error {
    constructor(argumentName) {
        super(`A ${argumentName} could not be found in your message, are you sure you formatted it correctly?\n\nTap or type /help for full instructions.`);
    }
}
exports.MissingArgumentError = MissingArgumentError;
class ParserError extends Error {
    constructor(input, inputType, additionalInfo = '') {
        // TODO: Log the error
        super(`Error parsing ${inputType} '${input}'. ${additionalInfo}`);
    }
}
exports.ParserError = ParserError;
class TooManyArgumentsError extends Error {
    constructor(argumentName, matches) {
        super(`Too many ${argumentName}s were found in your message. The following ${argumentName}s were found: ${matches}.

Are you sure you formatted it correctly? Tap or type /help for full instructions.`);
    }
}
exports.TooManyArgumentsError = TooManyArgumentsError;
class ValueError extends Error {
    constructor(parameterName, badValue, possibleValues = []) {
        let message = `Unrecognized value '${badValue}' for parameter '${parameterName}'.`;
        if (possibleValues.length) {
            message += ` Possible values are ${possibleValues}.`;
        }
        super(message);
    }
}
exports.ValueError = ValueError;
