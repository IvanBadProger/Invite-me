import { Field, Form, PasswordInput } from "@/shared/ui"
import { Alert, Button, Flex, Input, Stack } from "@chakra-ui/react"
import { useLoginForm } from "../model"

export const LoginForm = () => {
  const { formErrors, isPending, onSubmit, register } = useLoginForm()

  return (
    <Flex gap={8} direction="column">
      <LoginNeedAlert />

      <Form
        flexProps={{
          width: "full",
          mx: "auto",
          borderWidth: "1px",
          borderColor: "gray.200",
        }}
        formTitle="Авторизация"
        onSubmit={onSubmit}
      >
        {/*Fix: странные дерганья при входе  */}
        <Stack gap={4}>
          <Field label="Логин" isLabelHidden errorMessage={formErrors.login?.message}>
            <Input {...register("login")} placeholder="Логин" />
          </Field>

          <Field label="Пароль" isLabelHidden errorMessage={formErrors.password?.message}>
            <PasswordInput placeholder="Пароль" {...register("password")} />
          </Field>

          <Button type="submit" loading={isPending} loadingText="Выполняется вход..." size={"lg"}>
            Войти
          </Button>
        </Stack>
      </Form>
    </Flex>
  )
}

export const LoginNeedAlert = () => {
  return (
    <Alert.Root status="info" mb={6} borderRadius="md" fontSize="sm">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Доступ только для авторизованных администраторов</Alert.Title>
        <Alert.Description>Войдите для управления системой</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
