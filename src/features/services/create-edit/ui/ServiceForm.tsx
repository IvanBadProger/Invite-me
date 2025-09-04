import type { Service } from "@/entities/service"
import { CheckboxControl, Field, Form, PriceControl, RadioControl } from "@/shared/ui"
import { TimeInputControl } from "@/shared/ui/TimeInputControl/TimeInputControl"
import { Button, Flex, Grid, Group, Input, Separator, Stack, VStack } from "@chakra-ui/react"
import { LABELS, TYPES } from "../constants"
import { useServiceForm } from "../model/useServiceForm"

type ServiceFormProps = {
  initialData?: Service
  size?: "sm" | "md" | "lg"
}

export const ServiceForm = ({ initialData, size }: ServiceFormProps) => {
  const { control, errors, onSubmit, register, isSubmiting, reset, isDirty } =
    useServiceForm(initialData)

  return (
    <Form onSubmit={onSubmit} size={size}>
      <VStack gap={6} align="stretch">
        <Stack gap={4}>
          <Field label={LABELS.title} isRequired errorMessage={errors.title?.message}>
            <Input placeholder={LABELS.title} {...register("title")} />
          </Field>
          <Field label={LABELS.description} errorMessage={errors.description?.message}>
            <Input placeholder={LABELS.description} {...register("description")} />
          </Field>
        </Stack>

        <Separator />

        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
          }}
          gap={4}
        >
          <Field label={LABELS.price} errorMessage={errors.price?.message}>
            <PriceControl name="price" control={control} defaultValue={1000} step={100} />
          </Field>
          <Field label={LABELS.work_time} errorMessage={errors.work_time?.message}>
            <TimeInputControl control={control} name="work_time" />
          </Field>
        </Grid>

        <Separator />

        <Field errorMessage={errors.type?.message} isRequired label={LABELS.type}>
          <RadioControl
            name="type"
            control={control}
            defaultValue={TYPES[0].value}
            radioOptions={TYPES}
          />
        </Field>

        <Separator />

        <Flex
          direction={{ base: "column-reverse", sm: "row" }}
          gap={4}
          justify={"space-between"}
          align={{ base: "stretch", sm: "center" }}
        >
          <Group>
            <Button
              type="submit"
              loading={isSubmiting}
              loadingText={"Сохранение"}
              maxWidth={"fit-content"}
            >
              {initialData ? "Обновить" : "Создать"}
            </Button>

            <Button
              type="button"
              variant="outline"
              maxWidth={"fit-content"}
              onClick={() => reset(initialData)}
              disabled={!isDirty}
            >
              Сбросить
            </Button>
          </Group>

          <CheckboxControl control={control} name="archived" label={LABELS.archived} />
        </Flex>
      </VStack>
    </Form>
  )
}
