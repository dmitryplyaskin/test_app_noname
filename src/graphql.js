const { ApolloServer } = require('apollo-server-express')
const { buildFederatedSchema } = require('@apollo/federation')
const passport = require('passport')
const cookieParser = require('cookie-parser')

const auth = require('./features/auth')

const cp = cookieParser()
const addCookies = (req, res) =>
	new Promise(resolve => {
		cp(req, res, resolve)
	})

const server = new ApolloServer({
	schema: buildFederatedSchema([auth.signUp, auth.logIn]),
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

module.exports = server
