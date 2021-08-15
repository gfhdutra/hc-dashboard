import type { AppProps } from 'next/app'
import { UserContextProvider } from "src/contexts/UserContext"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  /* min-width: fit-content; */
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
`

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </UserContextProvider>
  )
}
