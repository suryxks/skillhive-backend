import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    try {
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch (e) {
        return false
    }
}