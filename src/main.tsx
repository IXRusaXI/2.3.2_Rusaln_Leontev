import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './page/App.tsx'
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import { store } from './store/store.ts'
import '@mantine/core/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
)
