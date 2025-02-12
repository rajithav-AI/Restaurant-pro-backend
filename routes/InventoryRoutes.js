const express = require("express");
const {createInventoryItem,getInventory,updateInventoryItem,deleteInventoryItem} = require("../controllers/inventoryController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, isAdmin, createInventoryItem);
router.get("/", authMiddleware, getInventory);
router.put("/:itemId", authMiddleware, isAdmin, updateInventoryItem);
router.delete("/:itemId", authMiddleware, isAdmin, deleteInventoryItem);

module.exports = router;