"use strict";
/**
 * Establishes a connection to the database.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function connect(url) {
    mongoose.connect(url || 'mongodb://localhost:27017/queens_college')
        .then(() => {
        console.log(`Successfully connected to database at '${process.env.DB_URL}'`);
    })
        .catch((err) => {
        console.log(`There was an issue connecting to the MongoDB database at '${process.env.DB_URL}':`, err);
    });
}
exports.connect = connect;
//# sourceMappingURL=database.js.map