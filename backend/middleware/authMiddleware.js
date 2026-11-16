const jwt = require('jsonwebtoken');
const protectedRoute = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    try {
        // Force match the exact secret used across the app
        const JWT_SECRET = process.env.JWT_SECRET || 'incident_string';
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.'
        });
    }
};

module.exports = protectedRoute;
