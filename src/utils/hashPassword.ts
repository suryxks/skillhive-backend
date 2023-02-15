import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
    return bcrypt.hashSync(password,5)
}