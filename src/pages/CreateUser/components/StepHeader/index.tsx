import {
  CaretLeft,
  CheckCircle,
  Folder,
  Key,
  Person,
  User,
} from '@phosphor-icons/react'
import {
  BackToLogin,
  Container,
  Header,
  IconWithText,
  StepIconsArea,
  Title,
} from './styles'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

interface StepHeaderProps {
  stepCurrent: number
}

export function StepHeader({ stepCurrent }: StepHeaderProps) {
  const navigate = useNavigate()

  const handleBackToLoginPage = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <Container>
      <Header>
        <Title>
          Criação de <strong>Conta</strong>
        </Title>
        <BackToLogin onClick={handleBackToLoginPage}>
          <CaretLeft />
          <span>Voltar para a página de login</span>
        </BackToLogin>
      </Header>
      <StepIconsArea>
        <IconWithText
          $isComplete={stepCurrent > 0}
          $isCurrentStep={stepCurrent === 0}
        >
          {stepCurrent > 0 ? <CheckCircle size={40} /> : <User size={40} />}
          <span>Usuário</span>
        </IconWithText>
        <IconWithText
          $isComplete={stepCurrent > 1}
          $isCurrentStep={stepCurrent === 1}
        >
          <Person size={40} />
          <span>Dados Pessoais</span>
        </IconWithText>
        <IconWithText
          $isComplete={stepCurrent > 2}
          $isCurrentStep={stepCurrent === 2}
        >
          <Key size={40} />
          <span>Segurança</span>
        </IconWithText>
        <IconWithText
          $isComplete={stepCurrent > 3}
          $isCurrentStep={stepCurrent === 3}
        >
          <Folder size={40} />
          <span>Projeto/Cliente</span>
        </IconWithText>
      </StepIconsArea>
    </Container>
  )
}
