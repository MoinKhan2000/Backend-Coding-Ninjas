// Import the necessary modules here
import jwt from 'jsonwebtoken'

const jwtAuth = async (req, res, next) => {
  // 1. Retrieve the JWT token from cookies or headers
  console.log(req.cookies.jwtToken);
  let jwtToken = req.cookies.jwtToken || req.headers['authorization'];

  // 2. Check if JWT token exists
  if (!jwtToken) {
    return res.status(401).json({ status: 'false', msg: 'No JWT token found' });
  }

  try {
    // 3. Verify the JWT token with the secret key ('SECRET')
    const decoded = jwt.verify(jwtToken, 'SECRET');

    // 4. If verification succeeds, proceed to the next middleware or route handler
    if (decoded) {
      next();
    } else {
      return res.status(401).json({ status: 'false', msg: 'JWT verification failed' });
    }
  } catch (error) {
    // 5. If JWT verification fails, handle the error
    console.error('JWT verification error:', error.message);
    return res.status(401).json({ status: 'false', msg: 'JWT verification failed' });
  }
};

export default jwtAuth;
