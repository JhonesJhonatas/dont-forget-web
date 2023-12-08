import styled, { css } from 'styled-components'

interface IconWithTextProps {
  $isComplete: boolean
  $isCurrentStep: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.span`
  font-size: 1.5rem;
`

export const BackToLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  span {
    font-size: 0.75rem;
  }

  &:hover {
    color: ${(props) => props.theme.enphasis};
  }
`

export const StepIconsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`

export const IconWithText = styled.div<IconWithTextProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  svg {
    padding: 0.5rem;
    border-radius: 50px;
    transition: all 0.5s ease-in-out;

    ${(props) =>
      props.$isCurrentStep
        ? css`
            background-color: ${(props) => props.theme.enphasis};
          `
        : css`
            background-color: ${(props) => props.theme.cardBgPrimary};
          `}

    ${(props) =>
      props.$isComplete &&
      css`
        background-color: ${(props) => props.theme.sucess};
      `}
  }
`
