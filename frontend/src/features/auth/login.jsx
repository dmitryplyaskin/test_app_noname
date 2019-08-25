// @flow
import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { Logo } from '../../ui/atoms/logo'
import { Wrapper } from './atoms/wrapper'
import { Header } from './atoms/header'
import { Formik, Field } from 'formik'
import { Input } from '../../ui/atoms/input'

export const LogIn = () => {
	return (
		<Route path="/login">
			<Wrapper>
				<Logo marginBottom />
				<Header>авторизация</Header>
				<Formik>
					{({ handleSubmit }) => (
						<Form onSubmit={handleSubmit}>
							<Field name="email" component={Input} />
							<Field name="password" component={Input} />
						</Form>
					)}
				</Formik>
			</Wrapper>
		</Route>
	)
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
`
