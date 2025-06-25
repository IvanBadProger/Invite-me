import { useFormContext } from "react-hook-form"
import type { StepProps } from "./Step"
import React, { useDeferredValue, useState } from "react"
import { Form } from "../../Form/Form"
import { StepIndicator } from "./StepIndicator"
import { Navigation } from "./Navigation"

type RootProps = {
  onSubmit: (data: object) => void
  children:
    | React.ReactElement<StepProps>
    | React.ReactElement<StepProps>[]
  navigation?: boolean
  stepIndicator?: boolean
}

export const Root = (props: RootProps) => {
  const {
    onSubmit,
    children,
    navigation = true,
    stepIndicator = true,
  } = props
  const { handleSubmit, trigger } = useFormContext()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [fieldNames, setFieldNames] = useState<string[]>([])
  const deferredCurrentStepIndex = useDeferredValue(currentStepIndex)
  const totalSteps = React.Children.count(children)
  const lastStepIndex = totalSteps - 1

  const goToStep = async (stepIndex: number): Promise<void> => {
    const isValidStep = stepIndex < totalSteps && stepIndex >= 0
    const isGoForwardStep = stepIndex > currentStepIndex

    if (isGoForwardStep) {
      const isValidFields = await trigger(fieldNames)
      if (!isValidFields) {
        return
      }
    }

    if (isValidStep) {
      setCurrentStepIndex(stepIndex)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {stepIndicator && (
        <StepIndicator
          currentStep={deferredCurrentStepIndex}
          totalSteps={totalSteps}
          goToStep={goToStep}
        />
      )}

      {React.Children.map(children, (child) => {
        const isActiveStep = child.props.index === currentStepIndex
        const isValidChild = React.isValidElement(child)

        if (isValidChild && isActiveStep) {
          return React.cloneElement(child, {
            ...child.props,
            setFieldNames,
          })
        }

        return null
      })}

      {navigation && (
        <Navigation
          currentStep={deferredCurrentStepIndex}
          goToStep={goToStep}
          lastStepIndex={lastStepIndex}
        />
      )}
    </Form>
  )
}
