import { gql, ForbiddenError, UserInputError } from 'apollo-server-express'
import { User } from './schema'
import { compare } from '../../bcript'
import LocalStrategy from 'passport-local'
import { passport } from '../../passport'

const typeDefs = gql`
	type Query {
		logIn(email: String!, password: String!): Token!
	}
`

const resolvers = {
	Query: {
		logIn: async (parent, { email, password }, { req, res }) => {
			const user = await User.where({ email }).findOne(err => {
				if (err) throw new ForbiddenError('Sorry some error')
			})
			if (!user) {
				throw new UserInputError('User not found')
			}

			const isEqual = await compare(password, user.password)
			if (!isEqual) {
				throw new UserInputError('Password error')
			}
			const auth = await passport.authenticate(
				'local',
				{ session: true, password, username: email },
				(err, user) => {
					if (err) console.log(err)
					return user
				}
			)(req, res)
			return {
				token: 'you awesome token',
			}
		},
	},
}

export { resolvers, typeDefs }
