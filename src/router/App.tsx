import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy, Suspense } from "react"

const Home = lazy(() => import('../pages/Home'))
const Register = lazy(() => import('../pages/Register'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<p>Loading...</p>}><Home/></Suspense>,
  },
  {
    path: "/register",
    element: <Suspense fallback={<p>Loading...</p>}><Register/></Suspense>,
  }
])

export const App = () : JSX.Element => {
  return (
    <RouterProvider router={router} />
  )
}