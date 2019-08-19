import { Schema, model } from '../../datebase'

const UserSchema = Schema({
	email: { type: String },
	password: { type: String, min: 6, index: true },
	date: { type: Date, default: Date.now() },
})

export const User = model('User', UserSchema)
