
const verifyAdmin = (req, res, next) => 
    {
  if (req.user?.subscriptionStatus !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  Console.log("Admin access granted");
  next();
};
module.exports = verifyAdmin