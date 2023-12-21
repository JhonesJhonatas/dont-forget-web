import styled, { css } from 'styled-components'

interface StatusContainerProps {
  $status: string
}

interface PriorityContainer {
  $priority: string
}

export const TaskItem = styled.div`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  background-color: ${(props) => props.theme.cardBgSecondary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
`

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const StatusContainer = styled.div<StatusContainerProps>`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.65rem;
  background-color: ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.$status === 'toDo' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.opened};
      }
    `}

  ${(props) =>
    props.$status === 'standby' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.stand_by};
      }
    `}

    ${(props) =>
    props.$status === 'inProgress' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.in_progress};
      }
    `}

    ${(props) =>
    props.$status === 'approval' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.approval};
      }
    `}

    ${(props) =>
    props.$status === 'payment' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.payment};
      }
    `}

    ${(props) =>
    props.$status === 'concluded' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.concluded};
      }
    `}
`

export const MaturityContainer = styled.div`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.65rem;
  background-color: ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
    color: ${(props) => props.theme.danger};
  }
`

export const PriorityContainer = styled.div<PriorityContainer>`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.65rem;
  background-color: ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
    ${(props) =>
      props.$priority === 'low' &&
      css`
        color: ${(props) => props.theme.sucess};
      `}

    ${(props) =>
      props.$priority === 'normal' &&
      css`
        color: ${(props) => props.theme.enphasis};
      `}

    ${(props) =>
      props.$priority === 'high' &&
      css`
        color: ${(props) => props.theme.danger};
      `}

      ${(props) =>
      props.$priority === 'urgent' &&
      css`
        color: ${(props) => props.theme.error};
      `}
  }
`
