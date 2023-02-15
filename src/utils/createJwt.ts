import jwt from 'jsonwebtoken';

export const createJwt = (user) => {
    const { id, email } = user;
    const token = jwt.sign({
        id: id,
        email: email
    }, process.env.JWT_SECRET);
    return token
}