



const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    isAdmin: { type: Boolean, default:false },
    email: { type: String, required: true, unique: true },
    password: { type: String },
})

userSchema.pre('save', async function (next) {
    const user = this
    try {
        if (!user.isModified('password')) { return next() }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        return next()
    } catch (error) { return next(error) }
})

userSchema.methods.comparePassword = async function (password) {
    try { return await bcrypt.compare(password, this.password) } 
    catch (error) { throw new Error(error) }
}

const User = mongoose.model('user', userSchema, 'user')

module.exports = User