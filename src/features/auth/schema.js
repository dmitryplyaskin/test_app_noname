const { Schema, model } = require('../../datebase')
const UserSchema = new Schema({
	email: { type: String },
	password: { type: String, min: 6, index: true },
	date: { type: Date, default: Date.now() },
})

const User = model('User', UserSchema)

module.exports = User
