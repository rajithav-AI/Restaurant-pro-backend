const Menu = require("../models/Menu");

exports.createMenuItem = async (req, res) => {
  const { name, description, price, category, available, imageUrl } = req.body;
  
  try {
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const menuItem = new Menu({ name, description, price, category, available, imageUrl });
    await menuItem.save();
    
    res.status(201).json({ message: "Menu item created successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const menu = await Menu.find().skip(skip).limit(limit);
    const total = await Menu.countDocuments();

    res.status(200).json({
      menu,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.updateMenuItem = async (req, res) => {
  const { itemId } = req.params;
  const { name, description, price, category, available, imageUrl } = req.body;
  
  try {
    if (!itemId) {
      return res.status(400).json({ message: "Menu item ID is required." });
    }
    const menuItem = await Menu.findByIdAndUpdate(
      itemId,
      { name, description, price, category, available, imageUrl },
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item updated successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.deleteMenuItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    if (!itemId) {
      return res.status(400).json({ message: "Menu item ID is required." });
    }
    const menuItem = await Menu.findByIdAndDelete(itemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }
    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getMenuByCategory = async (req, res) => {
  const { category } = req.params;
  
  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required." });
    }
    const menu = await Menu.find({ category });
    if (menu.length === 0) {
      return res.status(404).json({ message: "No menu items found for this category." });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
