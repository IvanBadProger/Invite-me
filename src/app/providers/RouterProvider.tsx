import { ROUTES } from "@/shared/lib"
import { Layout } from "@/widgets/"
import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

const Home = lazy(() => import("@/pages/Home"))
const Login = lazy(() => import("@/pages/Login"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const CreateService = lazy(() => import("@/pages/CreateService"))
const EditService = lazy(() => import("@/pages/EditService"))

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.DASHBOARD}>
            <Route index element={<Dashboard />} />
            <Route
              path={"services-create"}
              element={<CreateService />}
            />
            <Route path={"services/:id"} element={<EditService />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
