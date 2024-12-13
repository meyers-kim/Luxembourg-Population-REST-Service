const statecService = require('../services/statecService');

exports.getPopulationData = async (req, res) => {
  const { year } = req.params;

  if (!/^\d{4}$/.test(year)) {
    return res.status(400).json({ error: 'Invalid year format. Please enter a four-digit year.' });
  }

  try {
    const data = await statecService.fetchPopulationData(parseInt(year));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve population data', details: error.message });
  }
};