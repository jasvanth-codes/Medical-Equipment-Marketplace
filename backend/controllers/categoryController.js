exports.getCategories = async (req, res) => {
  res.json([
    "Diagnostic Equipment",
    "Surgical Instruments",
    "Hospital Furniture",
    "Monitoring Devices",
    "Laboratory Equipment",
  ]);
};