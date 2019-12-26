"use strict";
/**
 * Establishes a connection to the database.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/**
 * Connect to the database.
 * @param url The url where the database is located. Defaults to localhost.
 * @param callback A function to be called if the connection succeeds.
 */
function connect(url, callback) {
    url = url || 'mongodb://localhost:27017/queens_college';
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        console.log(`Successfully connected to database at '${url}'`);
        if (callback) {
            callback();
        }
    })
        .catch((err) => {
        console.log(`There was an issue connecting to the MongoDB database at '${url}'.`);
        throw err;
    });
}
exports.connect = connect;
//# sourceMappingURL=connector.js.map