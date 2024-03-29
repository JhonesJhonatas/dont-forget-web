import hexToRgba from 'hex-to-rgba'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const DashBoardHeader = styled.section`
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1em;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

export const InitialInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

export const TextHeader = styled.div`
  display: flex;
  flex-direction: column;
`

export const WelcomeIcon = styled.div`
  span {
    font-size: 2.5rem;
  }
`

export const NotificationsArea = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  background-color: ${(props) => hexToRgba(props.theme.borderCard, 0.4)};
  padding: 0.5rem;
  border-radius: 60px;

  &:hover {
    background-color: ${(props) => hexToRgba(props.theme.borderCard, 0.6)};
  }
`

export const NotificationsCount = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${(props) => props.theme.error};
  padding: 0.25rem;
  border-radius: 60px;

  position: absolute;
  z-index: 1;
  margin-top: -30px;
  right: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 0.75rem;
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
  grid-template-columns: 4fr 4fr;
  gap: 1.5rem;
  height: calc(100vh - 16rem);
`

export const TitleOfBox = styled.div`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.cardBgPrimary};

  span {
    font-size: 1rem;
    font-weight: bold;
  }
`

export const ListViewTable = styled.div`
  padding: 1rem 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ListViewTableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TasksArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => hexToRgba(props.theme.opened, 0.02)};
  border: 1px solid ${(props) => props.theme.cardBgPrimary};
  padding: 1rem;
  border-radius: 6px;
  position: relative;
  overflow: auto;
`

export const EmptyTasksMessage = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
  justify-content: center;

  img {
    max-width: 14rem;
  }
`
