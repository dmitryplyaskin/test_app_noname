const { gql, ForbiddenError, UserInputError } = require('apollo-server-express')
const User = require('./schema')
const { compare } = require('../../bcript')
const passport = require('passport')
const LocalStrategy = require('passport-local')

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

module.exports = { resolvers, typeDefs }
