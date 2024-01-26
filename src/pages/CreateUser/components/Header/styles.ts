import styled, { css } from 'styled-components'

interface StepIconProps {
  $isComplete: boolean
  $isCurrentStep: boolean
}

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderTitle = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`

export const BackToLogin = styled.span`
  font-size: 0.75rem;
  cursor: pointer;
  color: ${(props) => props.theme.textSecondary};
  transition: all 0.2s ease-in-out;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: ${(props) => props.theme.textPrimary};
  }
`

export const IconsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const StepIcon = styled.div<StepIconProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  svg {
    border-radius: 60px;
    padding: 0.35rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    ${(props) =>
      props.$isComplete
        ? css`
            background-color: ${(props) => props.theme.enphasis};
          `
        : css`
            background-color: ${(props) => props.theme.cardBgPrimary};
          `}

    ${(props) =>
      props.$isCurrentStep &&
      css`
        background-color: ${(props) => props.theme.sucess};
      `}
  }

  span {
    font-size: 0.75rem;
  }
`
