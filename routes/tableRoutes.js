const express = require("express");
const { createTable, getTables, reserveTable, updateTableAvailability, deleteTable } = require("../controllers/tableController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, isAdmin, createTable);
router.get("/", authMiddleware, getTables);
router.post("/:tableId/reserve", authMiddleware, reserveTable);
router.put("/:tableId/availability", authMiddleware, updateTableAvailability);
router.delete("/:tableId", authMiddleware, isAdmin, deleteTable);

module.exports = router;

