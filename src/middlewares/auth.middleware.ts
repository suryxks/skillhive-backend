import { verifyToken } from '../utils';
export const auth = (req,res,next) => {
    const { user } = req.body;
    const token = req.headers.authorization;
    if (token && verifyToken(token)) {
        req.user = user;
        next();
    }
    res.status(401).json({message:'Invalid token'})
}