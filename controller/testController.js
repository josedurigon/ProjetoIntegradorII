// Test controller to handle basic requests for testing
exports.getTest = (req, res) => {
    res.send('Test route is working!');
};

exports.postTest = (req, res) => {
    res.json({ message: 'Test POST route is working!', data: req.body });
};
