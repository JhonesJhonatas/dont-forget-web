import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const DashBoardHeader = styled.section`
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const TextHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const WelcomeIcon = styled.div`
  span {
    font-size: 2.5rem;
  }
`

export const WelcomePhrase = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`

export const CardsArea = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: start;
`

export const FlexArea = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  height: calc(100vh - 16rem);
`

export const TasksResume = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 1rem;
  border-radius: 6px;
  height: 100%;
`

export const Notifications = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 1rem;
  border-radius: 6px;
`
