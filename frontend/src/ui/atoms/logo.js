// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import logo_img from './assets/Logo.svg'

type LogoType = {
	marginBottom: boolean,
	[key: string]: any,
}

export const Logo = (props: LogoType) => {
	return <LogoImg {...props} src={logo_img} alt="logo" />
}

const LogoImg = styled.img`
	${({ marginBottom }) =>
		marginBottom &&
		css`
			margin-bottom: 100px;
		`}
`
