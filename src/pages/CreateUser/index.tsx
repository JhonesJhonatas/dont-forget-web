import { useCallback, useMemo, useState } from 'react'
import { StepHeader } from './components/StepHeader'
import { StepUser } from './components/StepUser'
import { Container } from './styles'
import { StepPersonalData } from './components/StepPersonalData'
import { StepSecurity } from './components/StepSecurity'
import { StepProject } from './components/StepProject'
import { useCreateUser } from '../../hooks/user/useCreateUser'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useNotify } from '../../hooks/useNotify'
import { useNavigate } from 'react-router-dom'

export type StepUserDataSchema = {
  name: string
  email: string
}

export type StepPersonalDataSchema = {
  role: string
  birthDate: string
}

export type StepSecuritySchema = {
  password: string
}

export type StepProjectDataSchema = {
  projectName: string
  projectColor: string
  projectDescription: string
}

export function CreateUser() {
  const [stepCurrent, setStepCurrent] = useState(0)
  const [stepUserData, setStepUserData] = useState({} as StepUserDataSchema)
  const [stepPersonalData, setStepPersonalData] = useState(
    {} as StepPersonalDataSchema,
  )
  const [stepSecurityData, setStepSecurityData] = useState(
    {} as StepSecuritySchema,
  )

  const { createNewUser } = useCreateUser()
  const navigate = useNavigate()
  const { notify } = useNotify()

  const onSubmit = useCallback(
    async ({
      projectName,
      projectColor,
      projectDescription,
    }: StepProjectDataSchema) => {
      const createdUser = await createNewUser({
        ...stepUserData,
        ...stepPersonalData,
        ...stepSecurityData,
        projectName,
        projectColor,
        projectDescription,
      })
      if (createdUser) {
        notify({ type: 'sucess', message: 'Usuário Cadastrado com sucesso' })
        localStorage.setItem('emailToLogin', stepUserData.email)
        navigate('/')
      }
    },
    [
      createNewUser,
      navigate,
      notify,
      stepPersonalData,
      stepSecurityData,
      stepUserData,
    ],
  )

  const nextStep = useCallback(() => {
    setStepCurrent(stepCurrent + 1)
  }, [stepCurrent])

  const currentView = useMemo(() => {
    if (stepCurrent === 0) {
      return <StepUser setFormData={setStepUserData} nextStep={nextStep} />
    }
    if (stepCurrent === 1) {
      return (
        <StepPersonalData
          setFormData={setStepPersonalData}
          nextStep={nextStep}
        />
      )
    }
    if (stepCurrent === 2) {
      return (
        <StepSecurity setFormData={setStepSecurityData} nextStep={nextStep} />
      )
    }
    if (stepCurrent === 3) {
      return <StepProject onSubmit={onSubmit} />
    }
  }, [nextStep, onSubmit, stepCurrent])

  return (
    <>
      <Container>
        <StepHeader stepCurrent={stepCurrent} />
        {currentView}
      </Container>
      <ToastContainer />
    </>
  )
}
