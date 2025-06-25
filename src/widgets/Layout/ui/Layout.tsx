import { NavLink } from "react-router-dom"
import {
  MAIN_TOAST_CONTAINER_ID,
  ROUTES,
} from "@/shared/lib/constants"
import { Bounce, ToastContainer } from "react-toastify"
import { Box, Container, Stack } from "@chakra-ui/react"

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ToastContainer
        containerId={MAIN_TOAST_CONTAINER_ID}
        position="top-center"
        autoClose={2000}
        limit={3}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export const Header = () => {
  return (
    <Box as={"header"}>
      <Container>
        <Stack direction={"row"} spaceX={4}>
          <li>
            <NavLink to={ROUTES.HOME}>Главная</NavLink>
          </li>
          <li>
            {/* <AuthButton /> */}
            <NavLink to={ROUTES.LOGIN}>Login</NavLink>
          </li>
        </Stack>
      </Container>
    </Box>
  )
}

export const Footer = () => {
  return (
    <footer>
      <Container>FOOTER</Container>
    </footer>
  )
}
