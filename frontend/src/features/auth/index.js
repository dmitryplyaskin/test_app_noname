import React from 'react'
import { Route } from 'react-router-dom'
import { LogIn } from './login'
import { SignIn } from './signin'

export const Auth = () => {
	return (
		<>
			<Route path="/login" component={LogIn} />
			<Route path="/signin" component={SignIn} />
		</>
	)
}
