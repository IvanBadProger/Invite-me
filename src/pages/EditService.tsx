import { useService } from "@/entities/service"
import { useProtectedPage } from "@/features/auth"
import { ServiceForm } from "@/features/services/create-edit"
import { useServicePhoto } from "@/features/services/photo"
import { ROUTES } from "@/shared/lib"
import {
  Alert,
  Box,
  Button,
  FileUpload,
  Flex,
  Float,
  Grid,
  Heading,
  Image,
  Skeleton,
  type FileUploadFileAcceptDetails,
} from "@chakra-ui/react"
import { LucideUpload, X } from "lucide-react"
import { useParams } from "react-router"

export default function EditService() {
  const { id = "" } = useParams()
  const {
    service,
    isLoading: isServiceLoading,
    error: serviceError,
    isError: isServiceError,
  } = useService(id)
  const { isLoading: isPhotoLoading, onDelete, onUpload } = useServicePhoto()
  useProtectedPage(ROUTES.LOGIN)

  const onFileUpload = async (data: FileUploadFileAcceptDetails) => {
    const formData = new FormData()
    formData.append("photo", data.files[0])
    onUpload({ id, formData })
  }

  const onFileDelete = () => {
    onDelete(id)
  }

  if (isServiceLoading) {
    return (
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        <Skeleton height="400px" borderRadius="lg" />
        <Skeleton height="300px" borderRadius="lg" />
      </Grid>
    )
  }

  if (isServiceError) {
    return (
      <Alert.Root status="error" borderRadius="lg">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Не удалось загрузить услугу</Alert.Title>
          <Alert.Description>{serviceError?.message || "Услуга не найдена"}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <Grid gap={8} templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
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
            <Button type="button" onClick={onFileDelete} aria-label="Удалить фото">
              <X />
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
          disabled={isPhotoLoading}
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
