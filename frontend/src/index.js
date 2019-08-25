//@flow
import React from 'react'
import ReactDOM from 'react-dom'
import { View } from './view'

const root = document.getElementById('root')
if (!root) throw Error('no body')

ReactDOM.hydrate(<View />, root)
