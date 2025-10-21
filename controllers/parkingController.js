const Slot = require('../models/Slot');

// GET /api/slots
exports.getSlots = async (req, res, next) => {
  try {
    const slots = await Slot.findAll();
    res.json({ slots });
  } catch (err) {
    next(err);
  }
};

// GET /api/slots/:id
exports.getSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findByPk(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
  } catch (err) {
    next(err);
  }
};

// POST /api/slots  (create new slot)
exports.addSlot = async (req, res, next) => {
  try {
    const { label, lotName, level, hourlyRate } = req.body;
    if (!label) return res.status(400).json({ message: 'label required' });

    const exists = await Slot.findOne({ where: { label } });
    if (exists) return res.status(400).json({ message: 'Slot with this label already exists' });

    const slot = await Slot.create({ label, lotName, level, hourlyRate });
    res.status(201).json(slot);
  } catch (err) {
    next(err);
  }
};

// PUT /api/slots/:id  (update slot)
exports.updateSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findByPk(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    await slot.update(req.body);
    res.json(slot);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/slots/:id
exports.deleteSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findByPk(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    await slot.destroy();
    res.json({ message: 'Slot deleted' });
  } catch (err) {
    next(err);
  }
};
