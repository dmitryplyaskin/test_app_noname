import React from 'react'
import styled from 'styled-components'

export const Input = ({ field, form, ...props }) => {
	console.log(field, form)
	return <StyledInput {...field} {...props} />
}

const StyledInput = styled.input`
	border: 1px solid #cecece;
	box-sizing: border-box;
	border-radius: 3px;
	width: 305px;
	height: 47px;
	margin-bottom: 25px;
	padding: 15px;
`
