import { UserModel } from '../features/user/user.model.js';

const basicAuthorizer = (req, res, next) => {
    // 1. Check if the authorization header is empty.
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        // If no authorization header is found, respond with a 401 Unauthorized status.
        return res.status(401).send('No authorization details found');
    }

    // 2. Extract credentials.
    // The authorization header looks like: "Basic base64encodedString"
    // Replace "Basic" with an empty string to extract the base64 encoded credentials.
    console.log(authHeader);  // Example output: "Basic dXNlcm5hbWU6cGFzc3dvcmQ="
    const base64Credentials = authHeader.replace('Basic ', ''); // We are removing "Basic" and getting "dXNlcm5hbWU6cGFzc3dvcmQ="
    console.log(base64Credentials);  // Example output: "dXNlcm5hbWU6cGFzc3dvcmQ="

    // 3. Decode credentials.
    // Decode the base64 encoded string to get the credentials in the format "username:password".
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf8'); // We are decoding base64 to "username:password"
    console.log(decodedCredentials);  // Example output: "username:password"

    // 4. Split the decoded credentials to get the username and password.
    const creds = decodedCredentials.split(':'); // We are splitting "username:password" to ["username", "password"]
    const [email, password] = creds;

    // 5. Check if the user exists and the credentials match.
    const user = UserModel.getAllUsers().find(user => user.email === email && user.password === password);
    if (user) {
        // If the user is found and credentials match, allow the request to proceed.
        console.log(user);  // Log the user details for debugging purposes.
        next();
    } else {
        // If the credentials are incorrect, respond with a 401 Unauthorized status.
        return res.status(401).send('Incorrect credentials');
    }
};

export default basicAuthorizer;
