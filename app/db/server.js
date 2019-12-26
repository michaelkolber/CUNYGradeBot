"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const connector = require("./connector");
const app = express();
const port = process.env.PORT || 1900;
// Make sure JSON is parsed properly
app.use(express.json());
// Set up routes
const apiRouter = express.Router();
const helpers_1 = require("./helpers");
const classesRouter = require("./routes/classes");
const searchRouter = require("./routes/search");
apiRouter.use('/classes', classesRouter);
apiRouter.use('/search', searchRouter);
app.use('/api', apiRouter);
// Exists to make sure the API is up.
app.get('/', (req, res) => {
    const message = helpers_1.createErrorMessage("All requests must go through '/api'.");
    res.status(403).json(message);
});
// Establish a connection to the database
connector.connect(process.env.DB_URL, () => {
    // Start the server
    app.listen(port, () => console.log(`API server ready on port ${port}.`));
});
//# sourceMappingURL=server.js.map