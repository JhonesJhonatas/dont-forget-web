import styled, { css } from 'styled-components'

interface ContainerProps {
  $choosedStatus: string
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
      props.$choosedStatus === 'toDo' &&
      css`
        color: ${(props) => props.theme.opened};
      `}

    ${(props) =>
      props.$choosedStatus === 'standby' &&
      css`
        color: ${(props) => props.theme.stand_by};
      `}

      ${(props) =>
      props.$choosedStatus === 'inProgress' &&
      css`
        color: ${(props) => props.theme.in_progress};
      `}

      ${(props) =>
      props.$choosedStatus === 'approval' &&
      css`
        color: ${(props) => props.theme.approval};
      `}

      ${(props) =>
      props.$choosedStatus === 'payment' &&
      css`
        color: ${(props) => props.theme.payment};
      `}
  }

  span {
    font-size: 0.75rem;
  }
`
