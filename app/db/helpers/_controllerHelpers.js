"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an error message JSON object that can be returned to the client.
 * @param reason The reason that the request failed.
 */
function _craftErrorMessage(reason) {
    const message = {
        ok: false,
        result: {
            reason,
        },
    };
    return message;
}
/**
 * Sends a custom error message to the client.
 * @param res The request's `Response` object.
 * @param reason The reason that the request failed.
 * @param statusCode The HTTP status code to use when responding.
 */
function sendErrorMessage(res, reason, statusCode = 500) {
    const message = _craftErrorMessage(reason);
    res.status(statusCode).send(message);
}
exports.sendErrorMessage = sendErrorMessage;
/**
 * Sends a response back to the client with the detais of the error.
 * @param err The error that occurred.
 * @param res The request's `Response` object.
 */
function handleError(res, err) {
    sendErrorMessage(res, 'An error occurred:\n' + err, 500);
}
exports.handleError = handleError;
/**
 * Creates a result message JSON object that can be returned to the client.
 * @param result The requested data.
 */
function craftResultMessage(result) {
    if (result === undefined)
        result = null; // To make sure we always send a result
    const message = {
        ok: true,
        result,
    };
    return message;
}
exports.craftResultMessage = craftResultMessage;
//# sourceMappingURL=_controllerHelpers.js.map