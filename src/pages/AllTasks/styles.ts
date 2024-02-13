import hexToRgba from 'hex-to-rgba'
import styled, { css } from 'styled-components'

type StatusSchema =
  | 'toDo'
  | 'standby'
  | 'inProgress'
  | 'approval'
  | 'payment'
  | 'concluded'

interface CurrentViewButtonProps {
  $currentView: 'list' | 'kanban'
}

interface TasksAreaTitleProps {
  $status: StatusSchema
}

interface TasksAreaProps {
  $status: StatusSchema
}

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 64px);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
`

export const Header = styled.header`
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBgSecondary};
  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 2rem;
`

export const CurrentViewButton = styled.div<CurrentViewButtonProps>`
  background-color: ${(props) => props.theme.cardBgPrimary};
  border-radius: 4px;
  overflow: hidden;

  display: flex;
  align-items: center;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    padding: 0.25rem;
    cursor: pointer;

    transition: all 0.2s ease-in-out;
  }

  ${(props) =>
    props.$currentView === 'list' &&
    css`
      svg:first-child {
        background-color: ${(props) => props.theme.enphasis};
      }

      svg:last-child {
        &:hover {
          background-color: ${(props) => props.theme.borderCard};
        }
      }
    `}

  ${(props) =>
    props.$currentView === 'kanban' &&
    css`
      svg:last-child {
        background-color: ${(props) => props.theme.enphasis};
      }

      svg:first-child {
        &:hover {
          background-color: ${(props) => props.theme.borderCard};
        }
      }
    `}
`

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;

  overflow: auto;
`

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const TasksArea = styled.div<TasksAreaProps>`
  padding: 0.5rem;
  background-color: ${(props) => hexToRgba(props.theme.cardBgSecondary, 0.2)};
  border-radius: 6px;

  ${(props) =>
    props.$status === 'toDo' &&
    css`
      border-left: 4px solid ${(props) => props.theme.opened};
    `}

  ${(props) =>
    props.$status === 'standby' &&
    css`
      border-left: 4px solid ${(props) => props.theme.stand_by};
    `}

    ${(props) =>
    props.$status === 'inProgress' &&
    css`
      border-left: 4px solid ${(props) => props.theme.in_progress};
    `}

    ${(props) =>
    props.$status === 'approval' &&
    css`
      border-left: 4px solid ${(props) => props.theme.approval};
    `}

    ${(props) =>
    props.$status === 'payment' &&
    css`
      border-left: 4px solid ${(props) => props.theme.payment};
    `}

    
    ${(props) =>
    props.$status === 'concluded' &&
    css`
      border-left: 4px solid ${(props) => props.theme.concluded};
    `}
`

export const TasksAreaTitle = styled.div<TasksAreaTitleProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;

  ${(props) =>
    props.$status === 'toDo' &&
    css`
      svg {
        color: ${(props) => props.theme.opened};
      }
    `}

  ${(props) =>
    props.$status === 'standby' &&
    css`
      svg {
        color: ${(props) => props.theme.stand_by};
      }
    `}

    ${(props) =>
    props.$status === 'inProgress' &&
    css`
      svg {
        color: ${(props) => props.theme.in_progress};
      }
    `}

    ${(props) =>
    props.$status === 'approval' &&
    css`
      svg {
        color: ${(props) => props.theme.approval};
      }
    `}

    ${(props) =>
    props.$status === 'payment' &&
    css`
      svg {
        color: ${(props) => props.theme.payment};
      }
    `}

    
    ${(props) =>
    props.$status === 'concluded' &&
    css`
      svg {
        color: ${(props) => props.theme.concluded};
      }
    `}
`

export const TasksContent = styled.div`
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const KanbanArea = styled.section`
  width: 100%;
`

export const KanbanColumns = styled.div`
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
`

export const Column = styled.div`
  background-color: ${(props) => hexToRgba(props.theme.cardBgSecondary, 0.2)};
  padding: 0.5rem;
  border-radius: 6px;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

interface StatusTitleProps {
  $status:
    | 'toDo'
    | 'standby'
    | 'inProgress'
    | 'approval'
    | 'payment'
    | 'concluded'
}

export const StatusTitle = styled.div<StatusTitleProps>`
  background-color: ${(props) => props.theme.cardBgPrimary};
  border: 1px solid ${(props) => props.theme.borderCard};
  padding: 0.25rem;
  text-align: center;
  border-radius: 6px;

  span {
    font-weight: bold;
    font-size: 0.85rem;
  }

  ${(props) =>
    props.$status === 'toDo' &&
    css`
      border-top: 3px solid ${props.theme.opened};
    `}

  ${(props) =>
    props.$status === 'standby' &&
    css`
      border-top: 3px solid ${props.theme.stand_by};
    `}

    ${(props) =>
    props.$status === 'inProgress' &&
    css`
      border-top: 3px solid ${props.theme.in_progress};
    `}

    ${(props) =>
    props.$status === 'approval' &&
    css`
      border-top: 3px solid ${props.theme.approval};
    `}

    ${(props) =>
    props.$status === 'payment' &&
    css`
      border-top: 3px solid ${props.theme.payment};
    `}

    ${(props) =>
    props.$status === 'concluded' &&
    css`
      border-top: 3px solid ${props.theme.concluded};
    `}
`

export const CardsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: calc(100vh - 14rem);
  padding-right: 0.25rem;
  position: relative;
  overflow: auto;
`
