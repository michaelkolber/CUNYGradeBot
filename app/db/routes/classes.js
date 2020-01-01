"use strict";
/**
 * The router for `/classes`.
 */
const express = require("express");
const classesController = require("../controllers/classesController");
const router = express.Router();
// The catch-all.
router.all('/', classesController.denyRootPath);
router.route('/:classId')
    // Handle getting of a specific class by its ID.
    .get(classesController.getClassById);
module.exports = router;
//# sourceMappingURL=classes.js.map