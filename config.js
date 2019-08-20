import dotenv from 'dotenv'
dotenv.config()

const ENV = {
	DATE_BASE: process.env.DATA_BASE,
	SECRET: process.env.SECRET,
}

export { ENV }
