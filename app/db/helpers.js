"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sends a response back to the client with the detais of the error.
 * @param err The error that occurred.
 * @param res The request's `Response` object.
 */
function handleError(err, res) {
    const message = createErrorMessage('An error occurred:\n' + err);
    res.status(500).json(message);
}
exports.handleError = handleError;
/**
 * Creates an error message JSON object that can be returned to the client.
 * @param reason The reason that the request failed.
 */
function createErrorMessage(reason) {
    const message = {
        ok: false,
        result: {
            reason,
        },
    };
    return message;
}
exports.createErrorMessage = createErrorMessage;
/**
 * Sends an error message to the client.
 * @param res The request's `Response` object.
 * @param reason The reason that the request failed.
 * @param statusCode The HTTP status code to use when responding.
 */
function sendErrorMessage(res, reason, statusCode) {
    if (statusCode) {
        res.status(statusCode);
    }
    const message = createErrorMessage(reason);
    res.send(message);
}
exports.sendErrorMessage = sendErrorMessage;
/**
 * Creates an error message JSON object that can be returned to the client.
 * @param reason The reason that the request failed.
 */
function createResultMessage(result) {
    const message = {
        ok: true,
        result,
    };
    return message;
}
exports.createResultMessage = createResultMessage;
//# sourceMappingURL=helpers.js.map