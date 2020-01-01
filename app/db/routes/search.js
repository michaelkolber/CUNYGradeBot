"use strict";
/**
 * The router for `/search`.
 */
const express = require("express");
const searchController = require("../controllers/searchController");
const router = express.Router();
router.use('/', searchController.requirePOST, searchController.search);
module.exports = router;
//# sourceMappingURL=search.js.map