import mng from 'mongoose'
import { ENV } from '../config'

const mongoose = mng
mongoose.connect(ENV.DATE_BASE, { useNewUrlParser: true }, err => {
	console.log(err)
})

const Schema = mongoose.Schema
const model = mongoose.model
export { mongoose, Schema, model }
