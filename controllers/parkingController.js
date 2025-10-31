const { Slot } = require('../models'); // ✅ use central model index

// GET all slots (public)
exports.getSlots = async (req, res, next) => {
  try {
    const slots = await Slot.findAll({ order: [['id', 'ASC']] });
    res.json(slots); // ✅ return array directly, not { slots }
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: 'Error fetching slots', error: err.message });
  }
};

// GET single slot by ID (public)
exports.getSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findByPk(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
  } catch (err) {
    console.error("Error fetching slot:", err);
    res.status(500).json({ message: 'Error fetching slot', error: err.message });
  }
};

// POST new slot (admin only)
exports.addSlot = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { label, lotName, level, hourlyRate } = req.body;

    if (!label) {
      return res.status(400).json({ message: 'Slot label required' });
    }

    // prevent duplicates
    const exists = await Slot.findOne({ where: { label } });
    if (exists) {
      return res.status(400).json({ message: 'Slot already exists' });
    }

    // ✅ match your DB schema
    const slot = await Slot.create({
      label,
      lotName: lotName || 'Main Lot',
      level: level ? parseInt(level) : 0,
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : 20,
      status: 'Available'
    });

    res.status(201).json({ message: 'Slot created successfully', slot });
  } catch (err) {
    console.error("Error adding slot:", err);
    res.status(500).json({ message: 'Error adding slot', error: err.message });
  }
};

// PUT slot (admin only)
exports.updateSlot = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const slot = await Slot.findByPk(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    await slot.update(req.body);
    res.json({ message: 'Slot updated successfully', slot });
  } catch (err) {
    console.error("Error updating slot:", err);
    res.status(500).json({ message: 'Error updating slot', error: err.message });
  }
};

// DELETE slot (admin only)
exports.deleteSlot = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const slot = await Slot.findByPk(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    await slot.destroy();
    res.json({ message: 'Slot deleted successfully' });
  } catch (err) {
    console.error("Error deleting slot:", err);
    res.status(500).json({ message: 'Error deleting slot', error: err.message });
  }
};
