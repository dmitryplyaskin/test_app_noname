import {
	gql,
	ForbiddenError,
	UserInputError,
	AuthenticationError,
} from 'apollo-server-express'
import { User } from './schema'
import { compare } from '../../bcript'
import LocalStrategy from 'passport-local'
import { passport } from '../../passport'
import jwt from 'jsonwebtoken'
import { ENV } from '../../../config'

const createToken = async (user, secret) => {
	const { id, email, role } = user
	return await jwt.sign({ id, email, role }, secret)
}

const typeDefs = gql`
	type Query {
		logIn(email: String!, password: String!): Token!
		test: Some
	}
	type Some {
		some: String
	}
`

const resolvers = {
	Query: {
		test: async (parent, { email, password }, ctx) => {
			if (ctx.user) {
				return { some: '123' }
			} else {
				throw new AuthenticationError('Your session expired. Sign in again.')
			}
		},
		logIn: async (parent, { email, password }, ctx) => {
			const user = await User.findOne({ email })
			if (!user) {
				throw new UserInputError('No user found with this email credentials.')
			}

			const isEqual = await compare(password, user.password)
			if (!isEqual) {
				throw new UserInputError('Password error')
			}
			const token = await createToken(user, ENV.SECRET)
			ctx.res.cookie('token', token, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 * 31,
			})

			return {
				token,
			}
		},
	},
}

export { resolvers, typeDefs }
