//@flow
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Auth } from './features/auth'
import { Global } from './ui/global-styles'

export const View = () => {
	return (
		<>
			<BrowserRouter>
				<Auth />
			</BrowserRouter>
			<Global />
		</>
	)
}
