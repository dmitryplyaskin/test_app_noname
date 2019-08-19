const { gql, ForbiddenError, UserInputError } = require('apollo-server-express')
const User = require('./schema')
const { hash } = require('../../bcript')

const typeDefs = gql`
	type Mutation {
		signUp(email: String!, password: String!): Token
	}
	type Token {
		token: String!
	}
`

const resolvers = {
	Mutation: {
		signUp: async (parent, { email, password }, { models }) => {
			const isEmail = await User.where({ email }).findOne((err, user) => {
				if (err) {
					throw new ForbiddenError('Sorry some error')
				}
			})
			if (isEmail) {
				throw new UserInputError('Email is busy')
			}
			if (password.length < 6) {
				throw new UserInputError('Password no less 6 ')
			}
			const pass = await hash(password)
			password = pass
			await User.create({ email, password }, (err, user) => {
				if (err) throw new ForbiddenError('Sorry some error')
			})
			return { token: 'sadsad' }
		},
	},
}

module.exports = { resolvers, typeDefs }
