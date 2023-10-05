import styled, { css } from 'styled-components'

interface PriorityProps {
  level: 'normal' | 'high' | 'urgent'
}

interface StatusProps {
  status:
    | 'opened'
    | 'stand_by'
    | 'in_progress'
    | 'approval'
    | 'payment'
    | 'concluded'
}

export const Container = styled.div`
  width: 20rem;
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  border-radius: 6px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.borderCard};
  }
`

export const CardHeader = styled.header`
  display: flex;
  align-items: start;
  justify-content: space-between;
`

export const CardTitle = styled.span`
  font-size: 1rem;
  font-weight: 300;
  max-width: 60%;
`

export const Status = styled.div<StatusProps>`
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background-color: ${(props) => props.theme.cardBgPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

  svg {
    ${(props) =>
      props.status === 'opened' &&
      css`
        color: ${props.theme.textSecondary};
      `}
  }

  svg {
    ${(props) =>
      props.status === 'opened' &&
      css`
        color: ${props.theme.borderCard};
      `}
  }

  svg {
    ${(props) =>
      props.status === 'in_progress' &&
      css`
        color: ${props.theme.enphasis};
      `}
  }

  svg {
    ${(props) =>
      props.status === 'approval' &&
      css`
        color: ${props.theme.danger};
      `}
  }

  svg {
    ${(props) =>
      props.status === 'payment' &&
      css`
        color: ${props.theme.error};
      `}
  }

  svg {
    ${(props) =>
      props.status === 'concluded' &&
      css`
        color: ${props.theme.sucess};
      `}
  }

  span {
    color: ${(props) => props.theme.textPrimary};
    font-size: 0.75rem;
  }
`

export const CardElements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Priority = styled.div<PriorityProps>`
  background-color: ${(props) => props.theme.cardBgPrimary};
  width: fit-content;
  padding: 0.2rem 0.75rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.textSecondary};
  }

  span {
    font-size: 0.8rem;
  }

  ${(props) =>
    props.level === 'normal' &&
    css`
      svg {
        color: ${props.theme.enphasis};
      }
    `}

  ${(props) =>
    props.level === 'high' &&
    css`
      svg {
        color: ${props.theme.danger};
      }
    `}

    ${(props) =>
    props.level === 'urgent' &&
    css`
      svg {
        color: ${props.theme.error};
      }
    `}
`

export const Maturity = styled.div`
  background-color: ${(props) => props.theme.cardBgPrimary};
  width: fit-content;
  padding: 0.2rem 0.75rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.danger};
  }

  span {
    font-size: 0.8rem;
  }
`
