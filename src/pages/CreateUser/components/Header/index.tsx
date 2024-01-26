import {
  CaretLeft,
  File,
  Folder,
  Key,
  Person,
  User,
} from '@phosphor-icons/react'
import {
  BackToLogin,
  HeaderContainer,
  HeaderTitle,
  Heading,
  IconsArea,
  StepIcon,
} from './styles'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  currentStep: number
  handleNavigateToStep: (step: number) => void
}

function Header({ currentStep, handleNavigateToStep }: HeaderProps) {
  const navigate = useNavigate()

  const handleBackToLogin = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <HeaderContainer>
      <Heading>
        <HeaderTitle>Criação de Usuário</HeaderTitle>
        <BackToLogin onClick={handleBackToLogin}>
          <CaretLeft />
          Voltar para a página de Login
        </BackToLogin>
      </Heading>

      <IconsArea>
        <StepIcon
          $isComplete={currentStep > 0}
          $isCurrentStep={currentStep === 0}
          onClick={() => handleNavigateToStep(0)}
        >
          <User size={32} />
          <span>Usuário</span>
        </StepIcon>
        <StepIcon
          $isComplete={currentStep > 1}
          $isCurrentStep={currentStep === 1}
          onClick={() => handleNavigateToStep(1)}
        >
          <Person size={32} />
          <span>Dados Pessoais</span>
        </StepIcon>
        <StepIcon
          $isComplete={currentStep > 2}
          $isCurrentStep={currentStep === 2}
          onClick={() => handleNavigateToStep(2)}
        >
          <Key size={32} />
          <span>Senha</span>
        </StepIcon>
        <StepIcon
          $isComplete={currentStep > 3}
          $isCurrentStep={currentStep === 3}
          onClick={() => handleNavigateToStep(3)}
        >
          <Folder size={32} />
          <span>Projeto</span>
        </StepIcon>
        <StepIcon
          $isComplete={currentStep > 4}
          $isCurrentStep={currentStep === 4}
          onClick={() => handleNavigateToStep(4)}
        >
          <File size={32} />
          <span>Termos</span>
        </StepIcon>
      </IconsArea>
    </HeaderContainer>
  )
}

export { Header }
