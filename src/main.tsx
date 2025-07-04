import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './Components/Pages/Homepage'
import Layout from './Components/Layout'
import Art from './Components/Pages/Art'
import Contact from './Components/Pages/Contact'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Homepage />
        },
        {
          path: "/homepage",
          element:
            <Homepage />
        },
        {
          path: "/art",
          element: <Art />
        },
        {
          path: "/contact",
          element: <Contact />
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
