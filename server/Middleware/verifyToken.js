import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // 1. Get token from header (Bearer <token>)
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {

        // 2. Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user data to request
        req.user = decoded;
        next(); // go to next middleware / route handler

    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}

export default verifyToken;