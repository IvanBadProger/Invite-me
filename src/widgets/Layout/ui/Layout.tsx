import { MAIN_TOAST_CONTAINER_ID } from "@/shared/lib/"
import { Bounce, ToastContainer } from "react-toastify"
import { Header } from "./Header"
import { Footer } from "./Footer"

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
