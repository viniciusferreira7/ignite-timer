import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CycleContextProvider } from './contexts/CycleContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CycleContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CycleContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
