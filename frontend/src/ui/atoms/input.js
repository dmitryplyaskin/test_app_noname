import React from 'react'
import styled, { css } from 'styled-components'

export const Input = ({ field, form: { touched, errors }, ...props }) => {
	const checkError = () =>
		errors[field.name] && touched[field.name] ? true : false
	const checkValid = () =>
		!errors[field.name] && touched[field.name] ? true : false

	return (
		<Wrapper>
			<StyledInput
				{...field}
				{...props}
				error={checkError()}
				valid={checkValid()}
			/>
			{checkError() ? <Error>{errors[field.name]}</Error> : null}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-bottom: 25px;
`

const StyledInput = styled.input`
	border: 1px solid #cecece;
	box-sizing: border-box;
	border-radius: 3px;
	width: 305px;
	height: 47px;
	padding: 15px;
	${({ error }) =>
		error &&
		css`
			color: #fb7070;
			border-color: #fb7070;
		`}
	${({ valid }) =>
		valid &&
		css`
			color: #1e1e48;
			border-color: #2a444d;
		`}
`
const Error = styled.div`
	width: 305px;
	font-size: 12px;
	line-height: 15px;
	color: #fb7070;
	margin-top: 3px;
`
