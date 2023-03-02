import bcrypt from 'bcrypt'
import { createUser, getOneUser } from '../repository/user'

export const authRegister = async ({ first_name, last_name, email, password, profile_pic }) => {
    try {
        let userData = await getOneUser({ email }, false)
        if (userData) return { status: 422, message: 'Email is already taken' }
        const encryptedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
        const registeredUser = await createUser({
            first_name,
            last_name,
            email,
            password: encryptedPassword,
            profile_pic
        })
        return registeredUser
    } catch (error) {
        return error;
    }
}

export const authLogin = async ({ email, password }) => {
    try {
        const user = await getOneUser({ $or: [{ email: email }, { username: email }] }, true)
        if (!user) return false
        const isPasswordMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
        if (!isPasswordMatch) return false
        delete user.password
        return user
    } catch (error) {
        return error;
    }
}
