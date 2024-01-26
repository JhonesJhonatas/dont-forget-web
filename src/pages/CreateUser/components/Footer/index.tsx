import { useMemo } from 'react'
import { Button } from '../../../../components/Button'
import { FooterContainer } from './styles'

interface FooterProps {
  handleNextStep: () => void
  handleBackStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

function Footer({
  handleBackStep,
  handleNextStep,
  isFirstStep,
  isLastStep,
}: FooterProps) {
  const whatShowInContainer = useMemo(() => {
    if (isFirstStep) {
      return (
        <Button type="button" onClick={handleNextStep}>
          Avançar
        </Button>
      )
    }

    if (isLastStep) {
      return (
        <>
          <Button type="button" onClick={handleBackStep}>
            Voltar
          </Button>
          <Button type="button" onClick={handleNextStep}>
            Cadastrar
          </Button>
        </>
      )
    }

    return (
      <>
        <Button type="button" onClick={handleBackStep}>
          Voltar
        </Button>
        <Button type="button" onClick={handleNextStep}>
          Avançar
        </Button>
      </>
    )
  }, [handleBackStep, handleNextStep, isFirstStep, isLastStep])

  return <FooterContainer>{whatShowInContainer}</FooterContainer>
}

export { Footer }
