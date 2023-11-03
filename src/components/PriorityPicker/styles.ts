import styled, { css } from 'styled-components'

interface ContainerProps {
  $choosedPriority: string
}

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.theme.cardBgPrimary};
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.borderCard};
  }

  svg {
    ${(props) =>
      props.$choosedPriority === 'low' &&
      css`
        color: ${(props) => props.theme.sucess};
      `}

    ${(props) =>
      props.$choosedPriority === 'normal' &&
      css`
        color: ${(props) => props.theme.enphasis};
      `}

      ${(props) =>
      props.$choosedPriority === 'high' &&
      css`
        color: ${(props) => props.theme.danger};
      `}

      ${(props) =>
      props.$choosedPriority === 'urgent' &&
      css`
        color: ${(props) => props.theme.error};
      `}
  }

  span {
    font-size: 0.75rem;
  }
`
