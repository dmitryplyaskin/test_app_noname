import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'
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
		return { req, res }
	},
})
