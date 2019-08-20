class MissingArgumentError extends Error {
    constructor(argumentName: string) {
        super(`A ${argumentName} could not be found in your message, are you sure you formatted it correctly?\n\nTap or type /help for full instructions.`)
    }
}

class ParserError extends Error {
    constructor(input: string, inputType: string, additionalInfo = '') {
        // TODO: Log the error
        super(`Error parsing ${inputType} '${input}'. ${additionalInfo}`)
    }
}

class TooManyArgumentsError extends Error {
    constructor(argumentName: string, matches: string[]) {
        super(`Too many ${argumentName}s were found in your message. The following ${argumentName}s were found: ${matches}.

Are you sure you formatted it correctly? Tap or type /help for full instructions.`)
    }
}

class ValueError extends Error {
    constructor(parameterName: string, badValue: string, possibleValues: string[] = []) {
        let message = `Unrecognized value '${badValue}' for parameter '${parameterName}'.`
        if (possibleValues.length) {
            message += ` Possible values are ${possibleValues}.`
        }
        super(message)
    }
}


export {MissingArgumentError, TooManyArgumentsError, ParserError, ValueError};
