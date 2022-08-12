const { verify } = require('../utils/jwtToken.js');

module.exports = async (req, res, next) => {
  console.log(req.cookie, 'reqcookielog');
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    console.log(cookie, 'cookielog');
    // Check the httpOnly session cookie for the current user
    if (!cookie) throw new Error('You must be signed in to continue');

    // Verify the JWT token stored in the cookie, then attach to each request
    const user = verify(cookie);

    req.user = user;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
