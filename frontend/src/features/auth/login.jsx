// @flow
import React from 'react'
import styled from 'styled-components'
import { Logo } from '../../ui/atoms/logo'
import { Wrapper } from './atoms/wrapper'
import { Header } from './atoms/header'
import { Formik, Field } from 'formik'
import { Input } from '../../ui/atoms/input'
import * as Yup from 'yup'
import { Button } from '../../ui/atoms/button'
import { Link } from './atoms/link'

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Введите корректный email')
		.required('Введите email'),
	password: Yup.string()
		.min(6, 'Пароль должен быть не менее 6 символов')
		.required('Введите пароль'),
})

export const LogIn = () => {
	const onSubmit = data => {}

	return (
		<Wrapper>
			<Logo marginBottom />
			<Header>авторизация</Header>
			<Formik
				onSubmit={onSubmit}
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={validationSchema}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Field name="email" placeholder={'Email'} component={Input} />
						<Field
							name="password"
							type="password"
							placeholder={'Пароль'}
							component={Input}
						/>
						<Button>Войти</Button>
					</Form>
				)}
			</Formik>
			<LinksWrapper>
				<Link to="/signin">Регистрация</Link>
			</LinksWrapper>
		</Wrapper>
	)
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
`
const LinksWrapper = styled.div`
	display: flex;
	margin-top: 20px;
	justify-content: space-between;
`
