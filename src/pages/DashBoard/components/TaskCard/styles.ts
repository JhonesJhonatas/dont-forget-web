import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  border-radius: 6px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: scale(1.02);
  }
`

export const CardHeader = styled.header`
  display: flex;
  align-items: start;
  justify-content: space-between;
`

export const CardTitle = styled.span`
  font-size: 1rem;
  font-weight: bold;
  max-width: 65%;
`

export const Status = styled.div`
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background-color: ${(props) => props.theme.cardBgPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

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

export const Priority = styled.div`
  background-color: ${(props) => props.theme.cardBgPrimary};
  width: fit-content;
  padding: 0.2rem 0.75rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.error};
  }

  span {
    font-size: 0.8rem;
  }
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
