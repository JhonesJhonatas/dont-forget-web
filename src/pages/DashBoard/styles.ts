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
  height: 100%;
  display: grid;
  grid-template-rows: 2fr 1fr;
  gap: 1.5rem;
  overflow: auto;
`

export const TasksForToday = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 1rem;
  border-radius: 6px;
  height: 100%;
  overflow: auto;
`

export const TasksForTomorrow = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 1rem;
  border-radius: 6px;
  height: 100%;
  overflow: auto;
`

export const TitleOfBox = styled.div`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.textSecondary};

  span {
    font-size: 1rem;
    font-weight: bold;
  }
`

export const ListViewTable = styled.table`
  width: 99%;
  border-collapse: separate;
  border-spacing: 0 1rem;
`

export const ListViewTableHeader = styled.thead`
  tr {
    th {
      font-weight: 300;
      text-align: start;
    }
  }
`

export const ListViewTableBody = styled.tbody``

export const Notifications = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 1rem;
  border-radius: 6px;
`
