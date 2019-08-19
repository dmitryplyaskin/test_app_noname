import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import query from 'qs-middleware'
import indexRouter from './routes/index'
import { gqServer } from './graphql'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import http from 'http'

const app = express()
const port = process.env.PORT || '3001'

app.set('port', port)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

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
