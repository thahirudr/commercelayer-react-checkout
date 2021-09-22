import { useContext } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import tw from "twin.macro"

import { AppContext } from "components/data/AppProvider"

import { Step } from "./Step"

interface Props {
  steps: Array<SingleStepEnum>
  onStepChange: (stepIndex: SingleStepEnum) => void
  activeStep: SingleStepEnum
  lastActivable: SingleStepEnum
}

export const StepNav: React.FC<Props> = ({
  steps,
  onStepChange,
  activeStep,
  lastActivable,
}) => {
  const { t } = useTranslation()

  const ctx = useContext(AppContext)

  return (
    <Wrapper aria-label="Breadcrumb">
      <StepList>
        {(steps || []).map((step, index) => {
          const isActive = step === activeStep
          const isLocked =
            (step === "Shipping" && !ctx?.isShipmentRequired) ||
            (step === "Payment" && !ctx?.isPaymentRequired) ||
            (steps.indexOf(step) > steps.indexOf(lastActivable) &&
              lastActivable !== "Complete")

          return (
            <Step
              key={index}
              data-cy={`step_${step.toLocaleLowerCase()}`}
              data-status={isActive}
              onClick={() => {
                if (!isLocked) {
                  onStepChange(step)
                }
              }}
              isActive={isActive}
              isLocked={isLocked}
            >
              {t(`step${step}.title`)}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 mx-3 fill-current"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Step>
          )
        })}

        <Step
          isLocked={activeStep !== "Complete"}
          isActive={activeStep === "Complete"}
        >
          {t("general.complete")}
        </Step>
      </StepList>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  ${tw`mb-12 pt-2 hidden md:block`}
`

const StepList = styled.ol`
  ${tw`list-none p-0 inline-flex text-gray-900 text-sm font-medium`}
`
