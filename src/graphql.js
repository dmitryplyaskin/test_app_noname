import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { signUp, logIn } from './features/auth'
import { ENV } from '../config'

const getToken = async req => {
	const { token } = req.cookies

	if (token) {
		const user = await jwt.verify(token, ENV.SECRET)
		return user
		if (!user) {
			throw new AuthenticationError('Your session expired. Sign in again.')
		}
	}
}

export const gqServer = new ApolloServer({
	schema: buildFederatedSchema([signUp, logIn]),
	context: async ({ req, res }) => {
		if (req) {
			const user = await getToken(req)
			return {
				req,
				res,
				user,
			}
		}
		return {
			req,
			res,
			user: false,
		}
	},
})
