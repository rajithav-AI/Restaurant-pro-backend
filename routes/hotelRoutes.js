const express = require('express');
const {createHotel,getHotels,getHotelById,updateHotel,deleteHotel,searchHotels} = require('../controllers/SearchHotelsController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, isAdmin, createHotel);
router.get('/search', searchHotels); 
router.get('/', getHotels);
router.get('/:id', getHotelById);
router.put('/:id', authMiddleware, isAdmin, updateHotel);
router.delete('/:id', authMiddleware, isAdmin, deleteHotel);

module.exports = router;