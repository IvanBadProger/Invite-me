import { ROUTES } from "@/shared/lib"
import { Layout } from "@/widgets/Layout"
import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

const Home = lazy(() => import("@/pages/Home"))
const Login = lazy(() => import("@/pages/Login"))

// type RouterProviderProps = {}
// props: RouterProviderProps
export const RouterProvider = () => {
  // const {  } = props

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
