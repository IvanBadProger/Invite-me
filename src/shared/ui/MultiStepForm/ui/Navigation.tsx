import { Button } from "@chakra-ui/react"

type NavigationProps = {
  currentStep: number
  lastStepIndex: number
  goToStep: (step: number) => void
}

export const Navigation = (props: NavigationProps) => {
  const { currentStep, lastStepIndex, goToStep } = props
  const isLastStep = currentStep === lastStepIndex

  const onNext = async () => {
    goToStep(Math.min(lastStepIndex, currentStep + 1))
  }

  const onPrev = () => {
    goToStep(Math.max(0, currentStep - 1))
  }

  return (
    // Интересная ситуация: при клике на кнопку next на шаге 1\2 переход на 2\2 происходил, но при это и submit выполнялся.
    // Т.е. предпоследний next тригерит submit. Решил использовать useDeferredValue
    <div>
      {isLastStep ? (
        <Button type="submit">Отправить</Button>
      ) : (
        <Button type="button" onClick={onNext}>
          След
        </Button>
      )}
      <Button
        type="button"
        onClick={onPrev}
        disabled={currentStep === 0}
      >
        Пред
      </Button>
    </div>
  )
}
