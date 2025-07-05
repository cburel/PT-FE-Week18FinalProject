import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './Components/Pages/Homepage'
import Layout from './Components/Layout'
import Art from './Components/Pages/Art'
import Contact from './Components/Pages/Contact'

// router component - handles routing pages
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          // makes the index page link to /homepage
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
