import { ThemeProvider } from 'styled-components'
import { darkTheme } from './styles/themes/darkTheme'
import { GlobalStyle } from './styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'

export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}
