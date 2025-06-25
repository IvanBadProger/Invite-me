import { Form, Field } from "@/shared/ui"
import { Button, Input } from "@chakra-ui/react"
import { useLoginForm } from "../model"

export const LoginForm = () => {
  const { formErrors, isPending, onSubmit, register } = useLoginForm()

  return (
    <Form formTitle="Вход" onSubmit={onSubmit}>
      <Field
        label="Логин"
        isLabelHidden
        errorMessage={formErrors.login?.message}
      >
        <Input {...register("login")} placeholder="Логин" />
      </Field>

      <Field
        label="Пароль"
        isLabelHidden
        errorMessage={formErrors.password?.message}
      >
        <Input {...register("password")} placeholder="Пароль" />
      </Field>

      <Button type="submit" loading={isPending}>
        Войти
      </Button>
    </Form>
  )
}
