exports.searchProducts = async (req, res) => {
  res.json({
    message: "Search API Coming Soon",
    keyword: req.query.keyword,
  });
};