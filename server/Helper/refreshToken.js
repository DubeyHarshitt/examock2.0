import jwt from 'jsonwebtoken'
const generateRefreshToken = (user)=>{
    return jwt.sign( user ,  process.env.JWT_SECRET, {expiresIn: "1d"});
};

export default generateRefreshToken