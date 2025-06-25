import { Button } from "@chakra-ui/react"

type StepIndicatorProps = {
  totalSteps: number
  goToStep?: (step: number) => void
  currentStep: number
}

export const StepIndicator = (props: StepIndicatorProps) => {
  const { totalSteps, goToStep, currentStep } = props

  return (
    <div>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Button
          key={index}
          type="button"
          onClick={() => {
            console.log(index)
            goToStep?.(index)
          }}
          disabled={index === currentStep}
        >
          Шаг {index + 1}
        </Button>
      ))}
      Шаг {currentStep + 1} из {totalSteps}
    </div>
  )
}
