// Import the necessary modules here
import { getAllUsers } from "../features/user/model/user.model.js";

const basicAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ status: 'failure', msg: 'unauthorized' });
  }

  const base64Creds = authHeader.replace('Basic ', '');
  const decodedCreds = Buffer.from(base64Creds, 'base64').toString('utf8');
  const creds = decodedCreds.split(':');
  const [email, password] = creds;

  try {
    const users = getAllUsers(); // Ensure getAllUsers is awaited if it returns a Promise
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      next();
    } else {
      return res.status(401).send('Incorrect Credentials');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).send('Internal Server Error');
  }
};

export default basicAuthMiddleware;
