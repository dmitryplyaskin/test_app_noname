import { gql, ForbiddenError, UserInputError } from 'apollo-server-express'
import User from './schema'
import { compare } from '../../bcript'
import passport from 'passport'
import LocalStrategy from 'passport-local'

const typeDefs = gql`
	type Query {
		logIn(email: String!, password: String!): Token!
	}
`

const resolvers = {
	Query: {
		logIn: async (parent, { email, password }, context, info) => {
			const user = await User.where({ email }).findOne(err => {
				if (err) throw new ForbiddenError('Sorry some error')
			})
			if (!user) {
				throw new UserInputError('User not found')
			}

			const isLogin = await compare(password, user.password)
			if (!isLogin) {
				throw new UserInputError('Password error')
			}
			const a = await passport
			console.log('111', passport)
			return {
				token: 'you awesome token',
			}
		},
	},
}

export { resolvers, typeDefs }
