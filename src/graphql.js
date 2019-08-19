import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import { signUp, logIn } from './features/auth'

const cp = cookieParser()
const addCookies = (req, res) =>
	new Promise(resolve => {
		cp(req, res, resolve)
	})

export const gqServer = new ApolloServer({
	schema: buildFederatedSchema([signUp, logIn]),
	context: async ({ req, res }) => {
		const auth = await passport.authenticate(
			'local',
			{ session: false },
			(err, user) => {
				if (err) console.log(err)
				return user
			}
		)
		return { auth: auth(req, res) }
	},
})
