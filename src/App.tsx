import { ThemeProvider } from 'styled-components'
import { darkTheme } from './styles/themes/darkTheme'
import { GlobalStyle } from './styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { TasksProvider } from './contexts/TaskContext'

export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <AuthProvider>
        <TasksProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </TasksProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
