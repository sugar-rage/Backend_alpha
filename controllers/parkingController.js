const Slot = require('../models/Slot');

// GET /api/slots - Anyone (user/admin) can view
exports.getSlots = async (req, res, next) => {
  try {
    const slots = await Slot.findAll();
    res.json({ slots });
  } catch (err) {
    next(err);
  }
};

// GET /api/slots/:id - Anyone can view
exports.getSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findByPk(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
  } catch (err) {
    next(err);
  }
};

// POST /api/slots - Only admin can create a new slot
exports.addSlot = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { label, lotName, level, hourlyRate } = req.body;
    if (!label) return res.status(400).json({ message: 'Slot label required' });

    const exists = await Slot.findOne({ where: { label } });
    if (exists) return res.status(400).json({ message: 'Slot already exists' });

    const slot = await Slot.create({ label, lotName, level, hourlyRate, status: 'Available' });
    res.status(201).json({ message: 'Slot created successfully', slot });
  } catch (err) {
    next(err);
  }
};

// PUT /api/slots/:id - Only admin can update
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
    next(err);
  }
};

// DELETE /api/slots/:id - Only admin can delete
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
    next(err);
  }
};
