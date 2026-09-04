exports.getProfile = async (req, res) => {
  res.json({
    name: "Demo User",
    email: "demo@example.com",
  });
};

exports.updateProfile = async (req, res) => {
  res.json({
    message: "Profile Updated",
  });
};