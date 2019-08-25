//@flow
import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Auth } from './features/auth'
import { Global } from './ui/global-styles'

export const View = () => {
	return (
		<>
			<BrowserRouter basename="/">
				<Switch>
					<Auth />
				</Switch>
			</BrowserRouter>
			<Global />
		</>
	)
}
