const Table = require('../models/Table');

exports.createTable = async (req, res) => {
  const { tableNumber, capacity, isAvailable, reservedBy, reservationTime } = req.body;
  
  if (!tableNumber || !capacity) {
    return res.status(400).json({ message: 'Table number and capacity are required' });
  }

  try {
    const table = new Table({
      tableNumber,
      capacity,
      isAvailable,
      reservedBy,
      reservationTime
    });
    await table.save();
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables', error: error.message });
  }
};

exports.reserveTable = async (req, res) => {
  const { tableId } = req.params;
  const { reservedBy, reservationTime } = req.body;
  
  if (!reservedBy || !reservationTime) {
    return res.status(400).json({ message: 'ReservedBy and ReservationTime are required' });
  }

  try {
    const table = await Table.findById(tableId);
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    if (!table.isAvailable) {
      return res.status(400).json({ message: 'Table is already reserved' });
    }

    table.isAvailable = false;
    table.reservedBy = reservedBy;
    table.reservationTime = reservationTime;

    await table.save();
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Error reserving table', error: error.message });
  }
};

exports.updateTableAvailability = async (req, res) => {
  const { tableId } = req.params;
  const { isAvailable } = req.body;

  if (typeof isAvailable !== 'boolean') {
    return res.status(400).json({ message: 'isAvailable must be a boolean' });
  }

  try {
    const table = await Table.findByIdAndUpdate(
      tableId,
      { isAvailable },
      { new: true }
    );
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Error updating table availability', error: error.message });
  }
};

exports.deleteTable = async (req, res) => {
  const { tableId } = req.params;
  
  try {
    const table = await Table.findByIdAndDelete(tableId);
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting table', error: error.message });
  }
};
