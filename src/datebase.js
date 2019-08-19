import mongoose from 'mongoose'
import { DATE_BASE } from '../config'
mongoose.connect(DATE_BASE, { useNewUrlParser: true }, err => {
	console.log(err)
})
module.exports = mongoose
