import { verifyToken } from '../utils';
export const auth = (req,res,next) => {
    const { user,token } = req.body;
    if (token && verifyToken(token)) {
        req.user = user;
        next();
    }
    res.status(401).json({message:'Invalid token'})
}