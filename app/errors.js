"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingArgumentError extends Error {
    constructor(argumentName) {
        super(`A ${argumentName} could not be found in your message, are you sure you formatted it correctly?\n\nTap or type /help for full instructions.`);
    }
}
exports.MissingArgumentError = MissingArgumentError;
