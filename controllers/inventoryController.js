const Inventory = require("../models/Inventory");

exports.createInventoryItem = async (req, res, next) => {
  try {
    const { itemName, quantity, unit } = req.body;

    if (!itemName || !quantity || !unit) {
      return res.status(400).json({ message: "Item name, quantity, and unit are required" });
    }

    const inventoryItem = new Inventory({ itemName, quantity, unit });
    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (error) {
    next(error);
  }
};

exports.getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

exports.updateInventoryItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { itemName, quantity, unit } = req.body;

    if (!itemName && !quantity && !unit) {
      return res.status(400).json({ message: "At least one field (itemName, quantity, unit) must be provided for update" });
    }

    const inventoryItem = await Inventory.findByIdAndUpdate(
      itemId,
      { itemName, quantity, unit },
      { new: true, runValidators: true }
    );

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    next(error);
  }
};

exports.deleteInventoryItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const inventoryItem = await Inventory.findByIdAndDelete(itemId);

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
