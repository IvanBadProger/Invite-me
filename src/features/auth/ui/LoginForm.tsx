import { Field, Form } from "@/shared/ui"
import { Box, Button, Input, Stack } from "@chakra-ui/react"
import { useLoginForm } from "../model"

export const LoginForm = () => {
  const { formErrors, isPending, onSubmit, register } = useLoginForm()

  return (
    <Box maxW={400} mx={"auto"}>
      <Form formTitle="Вход" onSubmit={onSubmit}>
        <Stack gap={4}>
          <Field label="Логин" isLabelHidden errorMessage={formErrors.login?.message}>
            <Input {...register("login")} placeholder="Логин" />
          </Field>

          {/* fix: пароль филд сделать */}
          <Field label="Пароль" isLabelHidden errorMessage={formErrors.password?.message}>
            <Input {...register("password")} placeholder="Пароль" />
          </Field>

          <Button type="submit" loading={isPending} mt={2}>
            Войти
          </Button>
        </Stack>
      </Form>
    </Box>
  )
}
