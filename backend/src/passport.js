import p from 'passport'
import { Strategy } from 'passport-local'

const passport = p

passport.use(
	new Strategy(
		{ usernameField: 'email', passwordField: 'passwd' },
		(username, password, done) => {
			console.log(username, password)
			User.findOne({ username }, function(err, user) {
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
		}
	)
)
export { passport }
