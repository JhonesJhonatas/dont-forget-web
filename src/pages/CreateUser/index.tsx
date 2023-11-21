import { useCallback, useMemo, useState } from 'react'
import { StepHeader } from './components/StepHeader'
import { StepUser } from './components/StepUser'
import { Container } from './styles'
import { StepPersonalData } from './components/StepPersonalData'
import { StepSecurity } from './components/StepSecurity'
import { StepProject } from './components/StepProject'

export interface FormDataSchema {
  name?: string
  email?: string
  password?: string
  birthDate?: Date
  role?: string
  title?: string
  description?: string
  color?: string
}

export function CreateUser() {
  const [stepCurrent, setStepCurrent] = useState(0)
  const [formData, setFormData] = useState({} as FormDataSchema)

  console.log('formData:', formData)

  const nextStep = useCallback(() => {
    setStepCurrent(stepCurrent + 1)
  }, [stepCurrent])

  const currentView = useMemo(() => {
    if (stepCurrent === 0) {
      return <StepUser setFormData={setFormData} nextStep={nextStep} />
    }
    if (stepCurrent === 1) {
      return (
        <StepPersonalData
          setFormData={setFormData}
          nextStep={nextStep}
          formData={formData}
        />
      )
    }
    if (stepCurrent === 2) {
      return (
        <StepSecurity
          setFormData={setFormData}
          nextStep={nextStep}
          formData={formData}
        />
      )
    }
    if (stepCurrent === 3) {
      return <StepProject />
    }
  }, [formData, nextStep, stepCurrent])

  return (
    <>
      <Container>
        <StepHeader stepCurrent={stepCurrent} />
        {currentView}
      </Container>
    </>
  )
}
