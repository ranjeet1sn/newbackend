module.exports = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
        res.send({
           error:"Not Authenticated"
          });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};