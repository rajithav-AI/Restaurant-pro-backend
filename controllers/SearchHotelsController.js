const Hotel = require('../models/Hotel');


exports.createHotel = async (req, res) => {
  try {
    const { name, location, rating, amenities, pricePerNight } = req.body;

    if (!name || !location || !rating || !amenities || !pricePerNight) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (pricePerNight <= 0) {
      return res.status(400).json({ message: 'Price per night must be a positive number' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const amenitiesArray = Array.isArray(amenities) ? amenities : amenities.split(',').map(item => item.trim());
    const hotel = new Hotel({
      name,
      location,
      rating,
      amenities: amenitiesArray,
      pricePerNight
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.searchHotels = async (req, res) => {
  const { name, location, rating, amenities, pricePerNight } = req.query;
  try {
    const query = {};

  
    if (name) query.name = new RegExp(name, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (rating) query.rating = rating;
    if (amenities) query.amenities = { $in: amenities.split(',').map(item => item.trim()) };
    if (pricePerNight) query.pricePerNight = { $lte: parseFloat(pricePerNight) };

    const hotels = await Hotel.find(query);

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
