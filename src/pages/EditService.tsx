import { useService } from "@/entities/service"
import { ServiceForm } from "@/features/services/create-edit"
import { useServicePhoto } from "@/features/services/photo/model/useServicePhoto"
import {
  Box,
  Button,
  FileUpload,
  Float,
  Image,
  type FileUploadFileAcceptDetails,
} from "@chakra-ui/react"
import { LucideUpload } from "lucide-react"
import { useParams } from "react-router"

const EditService = () => {
  const { id = "" } = useParams()
  const { service } = useService(id ?? "")
  const { isLoading, onDelete, onUpload } = useServicePhoto()

  const onFileUpload = (data: FileUploadFileAcceptDetails) => {
    const formData = new FormData()

    formData.append("photo", data.files[0])

    onUpload({ id, formData })
  }

  const onFileDelete = () => {
    onDelete(id)
  }

  return (
    <>
      <h1>edit Service</h1>

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
              <Box display="flex" alignItems="center" gap={2}>
                <LucideUpload size={20} />
                <Box>
                  Перетащите фото сюда или кликните для выбора
                </Box>
              </Box>
              <Box color="gray.500" fontSize="sm">
                .png, .jpg (максимум 5MB на файл)
              </Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>

          <FileUpload.List />
        </FileUpload.Root>
      )}
    </>
  )
}
export default EditService
