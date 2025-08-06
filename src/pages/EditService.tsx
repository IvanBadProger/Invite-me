import { useService } from "@/entities/service"
import { useProtectedPage } from "@/features/auth"
import { ServiceForm } from "@/features/services/create-edit"
import { useServicePhoto } from "@/features/services/photo"
import { ROUTES } from "@/shared/lib"
import {
  Box,
  Button,
  FileUpload,
  Flex,
  Float,
  Grid,
  Heading,
  Image,
  type FileUploadFileAcceptDetails,
} from "@chakra-ui/react"
import { LucideUpload } from "lucide-react"
import { useParams } from "react-router"

const EditService = () => {
  const { id = "" } = useParams()
  const { service } = useService(id)
  const { isLoading, onDelete, onUpload } = useServicePhoto()
  useProtectedPage(ROUTES.LOGIN)

  const onFileUpload = (data: FileUploadFileAcceptDetails) => {
    const formData = new FormData()
    formData.append("photo", data.files[0])
    onUpload({ id, formData })
  }

  const onFileDelete = () => {
    onDelete(id)
  }

  return (
    <Grid gap={4} templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
      <Heading as={"h1"} gridColumn={{ base: "initial", md: "span 2" }}>
        Редактирование услуги &nbsp;
        <Box as={"em"} fontWeight={"bold"}>
          {service?.title}
        </Box>
      </Heading>

      <ServiceForm initialData={service} />

      {service?.photo_url ? (
        <Box position="relative">
          <Float>
            <Button type="button" onClick={onFileDelete}>
              Удалить фото
            </Button>
          </Float>
          <Image src={service.photo_url} alt="" />
        </Box>
      ) : (
        <FileUpload.Root
          maxW="xl"
          alignItems="stretch"
          maxFiles={1}
          onFileAccept={onFileUpload}
          disabled={isLoading}
        >
          <FileUpload.HiddenInput />
          <FileUpload.Dropzone>
            <FileUpload.DropzoneContent>
              <Flex alignItems="center" gap={2}>
                <LucideUpload size={20} />
                <Box>Перетащите фото сюда или кликните для выбора</Box>
              </Flex>
              <Box color="gray.500" fontSize="sm">
                .png, .jpg (максимум 5MB на файл)
              </Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>

          <FileUpload.List />
        </FileUpload.Root>
      )}
    </Grid>
  )
}
export default EditService
