import { useProtectedPage } from "@/features/auth"
import { ServiceForm } from "@/features/services/create-edit"
import { ROUTES } from "@/shared/lib"

const CreateService = () => {
  useProtectedPage(ROUTES.LOGIN)

  return (
    <>
      <h1>Создание услуги</h1>
      <ServiceForm />
    </>
  )
}
export default CreateService
