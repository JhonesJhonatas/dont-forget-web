import styled, { css } from 'styled-components'

interface TaskCountProps {
  $status:
    | 'opened'
    | 'stand_by'
    | 'in_progress'
    | 'approval'
    | 'payment'
    | 'concluded'
}

export const Container = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 0.5rem 0.75rem;
  border-radius: 60px;

  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const TaskCount = styled.div<TaskCountProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  div {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 60px;
    ${(props) =>
      props.$status === 'opened' &&
      css`
        background-color: ${(props) => props.theme.borderCard};
      `}
    ${(props) =>
      props.$status === 'stand_by' &&
      css`
        background-color: ${(props) => props.theme.textSecondary};
      `}
      ${(props) =>
      props.$status === 'in_progress' &&
      css`
        background-color: ${(props) => props.theme.enphasis};
      `}
      ${(props) =>
      props.$status === 'approval' &&
      css`
        background-color: ${(props) => props.theme.danger};
      `}
      ${(props) =>
      props.$status === 'payment' &&
      css`
        background-color: ${(props) => props.theme.error};
      `}
      ${(props) =>
      props.$status === 'concluded' &&
      css`
        background-color: ${(props) => props.theme.sucess};
      `}
  }

  span {
    font-size: 1rem;
    font-weight: bold;
  }
`

export const StatusPhrase = styled.span`
  font-size: 0.75rem;
`
