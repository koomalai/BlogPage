import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

//export async function enableMocking() {
if (process.env.NODE_ENV === 'development') {
  await import('./Mocks/browser.ts');
}

  /* const { worker } = await import('./Mocks/browser.ts');
  return worker.start(); */
//}
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </React.StrictMode>,
)

