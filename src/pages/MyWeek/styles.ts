import hexToRgba from 'hex-to-rgba'
import styled from 'styled-components'

export const WeekContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const WeekHeader = styled.div`
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PageTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-weight: bold;
    font-size: 1.15rem;
  }
`

export const ControllersArea = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

export const WeekSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    border: 1px solid ${(props) => props.theme.borderCard};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.cardBgPrimary};
    }
  }

  svg {
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`

export const DaysColumns = styled.div`
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
`

export const DayColumn = styled.div`
  background-color: ${(props) => hexToRgba(props.theme.cardBgSecondary, 0.2)};
  padding: 0.5rem;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const DayWeekTitle = styled.div`
  background-color: ${(props) => props.theme.cardBgPrimary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 0.25rem;
  text-align: center;
  border-radius: 6px;

  span {
    font-weight: bold;
    font-size: 0.85rem;
  }
`

export const CardsArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.5rem;
  max-height: calc(100vh - 13rem);
  padding-right: 0.25rem;
  position: relative;
  overflow: auto;
`
