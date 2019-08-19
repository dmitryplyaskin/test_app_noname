const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const query = require('qs-middleware')
const indexRouter = require('./routes/index')
const gqServer = require('./graphql')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const debug = require('debug')('time-checker:server')
const http = require('http')

const app = express()
const port = process.env.PORT || '3001'

app.set('port', port)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
console.log(process.env)

passport.use(
	new LocalStrategy(function(username, password, done) {
		console.log(username, password)
		User.findOne({ username: username }, function(err, user) {
			console.log(user)
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false)
			}
			if (!user.verifyPassword(password)) {
				return done(null, false)
			}
			return done(null, user)
		})
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use(query())
app.use('/', indexRouter)

const gqlPath = '/graphql'
gqServer.applyMiddleware({ app, gqlPath })

const server = http.createServer(app)
server.listen(port)

module.exports = app
