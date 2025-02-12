const express = require("express");
const {createMenuItem,getMenu,updateMenuItem,getMenuByCategory,deleteMenuItem} = require("../controllers/menuController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, isAdmin, createMenuItem);
router.get("/",getMenu);
router.put("/:itemId", authMiddleware, isAdmin, updateMenuItem);
router.delete("/:itemId", authMiddleware, isAdmin, deleteMenuItem);
router.get("/:category",authMiddleware, getMenuByCategory);

module.exports = router;