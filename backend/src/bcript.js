import bcrypt from 'bcrypt'
const saltRounds = 10

const hash = async password =>
	await bcrypt.hash(password, saltRounds).then(hash => hash)

const compare = async (password, hash) =>
	await bcrypt.compare(password, hash).then(res => res)

export { hash, compare }
