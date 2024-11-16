const jwt = require('jsonwebtoken');
const JWT_WEB_TOKEN = process.env.JWT_WEB_TOKEN;

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded; // Attach user data to request object
        console.log(decoded);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};