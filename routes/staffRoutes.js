const express = require("express");
const {createStaffProfile,getStaffProfile,updateStaffProfile,deleteStaffProfile,getAllStaffProfiles} = require("../controllers/staffController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware,isAdmin, createStaffProfile);
router.get("/", authMiddleware,isAdmin,getAllStaffProfiles); 
router.get("/:id", authMiddleware,isAdmin, getStaffProfile); 
router.put("/:id", authMiddleware,isAdmin, updateStaffProfile); 
router.delete("/:id", authMiddleware,isAdmin, deleteStaffProfile); 

module.exports = router;
