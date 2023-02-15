import bcrypt from 'bcrypt'

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password,hash)
}