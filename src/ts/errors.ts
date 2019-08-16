class MissingArgumentError extends Error {
    constructor(argumentName: string) {
        super(`A ${argumentName} could not be found in your message, are you sure you formatted it correctly?\n\nTap or type /help for full instructions.`)
    }
}

export {MissingArgumentError};