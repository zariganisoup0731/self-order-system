import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import App from './App.tsx'
import Menu from './Menu.tsx'
import Register from './Register.tsx'
import PurchaseConfirmed from './PurchaseConfirmed.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { OrderProvider } from './OrderContext.tsx'

const router = createBrowserRouter([
  {path: "/", Component: App},
  {path:"/menu", Component: Menu},
  {path:'/register', Component: Register},
  {path:'/purchasedConfirmed', Component: PurchaseConfirmed}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrderProvider>
      <RouterProvider router={router} />
    </OrderProvider>
  </StrictMode>,
)
