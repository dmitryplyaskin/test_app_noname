import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;

  }
  * {
    box-sizing: border-box;
  }
  
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
`
