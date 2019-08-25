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
	passwordConfirmation: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Пароль должен совпадать'
	),
})

export const SignIn = () => {
	const onSubmit = async data => {
		const res = fetch('http://127.0.0.1:3001/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query: `
					mutation SignUp ($email: String!, $password: String!) {
						signUp(email: $email, password: $password) {
							token
						}
					}
				`,
				variables: { ...data },
			}),
		}).then(x => x.json())
		console.log(res)
	}

	return (
		<Wrapper>
			<Logo marginBottom />
			<Header>Регистрация</Header>
			<Formik
				onSubmit={onSubmit}
				initialValues={{
					email: '',
					password: '',
					passwordConfirmation: '',
				}}
				validationSchema={validationSchema}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Field name="email" placeholder={'Email'} component={Input} />
						<Field
							type="password"
							name="password"
							placeholder={'Пароль'}
							component={Input}
						/>
						<Field
							type="password"
							name="passwordConfirmation"
							placeholder={'Пароль еще раз'}
							component={Input}
						/>
						<Button>Создать аккаунт</Button>
					</Form>
				)}
			</Formik>
			<LinksWrapper>
				<Link to="/login">Есть аккаунт? Авторизация</Link>
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
