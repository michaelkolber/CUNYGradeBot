"use strict";
/**
 * The router for `/professors`.
 */
const express = require("express");
const professorsController = require("../controllers/professorsController");
const router = express.Router();
// The catch-all.
router.all('/', professorsController.denyRootPath);
router.route('/:professorId')
    // Handle getting of a specific professor by its ID.
    .get(professorsController.getProfessorById);
module.exports = router;
//# sourceMappingURL=professors.js.map