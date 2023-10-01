import styled, { css } from 'styled-components'

interface StatusContainerProps {
  status:
    | 'opened'
    | 'stand_by'
    | 'in_progress'
    | 'approval'
    | 'payment'
    | 'concluded'
}

interface PriorityContainer {
  priority: 'normal' | 'high' | 'urgent'
}

export const TableTr = styled.tr`
  background-color: ${(props) => props.theme.cardBgSecondary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  td {
    &:first-child {
      border-radius: 6px 0 0 6px;

      div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
      }
    }

    &:last-child {
      border-radius: 0 6px 6px 0;
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.cardBgPrimary};
  }
`

export const StatusContainer = styled.div<StatusContainerProps>`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  background-color: ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.status === 'opened' &&
    css`
      div {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 60px;
        background-color: ${(props) => props.theme.textSecondary};
      }
    `}
`

export const MaturityContainer = styled.div`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
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
  font-size: 0.75rem;
  background-color: ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
    ${(props) =>
      props.priority === 'normal' &&
      css`
        color: ${(props) => props.theme.enphasis};
      `}

    ${(props) =>
      props.priority === 'high' &&
      css`
        color: ${(props) => props.theme.danger};
      `}

      ${(props) =>
      props.priority === 'urgent' &&
      css`
        color: ${(props) => props.theme.error};
      `}
  }
`
