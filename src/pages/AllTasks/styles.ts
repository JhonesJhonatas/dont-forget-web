import styled, { css } from 'styled-components'
import hexToRgba from 'hex-to-rgba'

interface IconViewProps {
  isCurrentView: boolean
}

interface StatusHeaderProps {
  status:
    | 'opened'
    | 'stand_by'
    | 'in_progress'
    | 'approval'
    | 'payment'
    | 'concluded'
}

interface ListViewTableHeaderProps {
  status:
    | 'opened'
    | 'stand_by'
    | 'in_progress'
    | 'approval'
    | 'payment'
    | 'concluded'
}

interface TaskListByStatusProps {
  status:
    | 'opened'
    | 'stand_by'
    | 'in_progress'
    | 'approval'
    | 'payment'
    | 'concluded'
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 92vh;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const HandleOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const TasksContainer = styled.div`
  height: calc(92vh - 5rem);
  padding-right: 1rem;
  overflow: auto;
`

export const OptionsContainer = styled.section`
  background-color: ${(props) => props.theme.cardBgPrimary};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const DateOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    height: 3rem;
    width: 3rem;
    background-color: ${(props) => props.theme.enphasis};
    border-radius: 6px;
    padding: 0.2rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.enphasisHover};
    }
  }

  div {
    span:first-child {
      font-size: 1.5rem;
      font-weight: bold;
    }

    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
`

export const FiltersContainer = styled.section`
  background-color: ${(props) => props.theme.cardBgPrimary};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FiltersArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  section {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 6px;

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  span {
    font-weight: bold;
  }
`

export const Divider = styled.div`
  width: 2px;
  height: 44px;
  background-color: ${(props) => props.theme.textSecondary};
`

export const LabelWithSelectInput = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  select {
    border-radius: 6px;
    height: 2rem;
    width: fit-content;
    background-color: ${(props) => props.theme.cardBgSecondary};
    border: 1px solid ${(props) => props.theme.borderCard};
    outline: 0;
    color: ${(props) => props.theme.textPrimary};

    &:focus {
      outline: 2px solid ${(props) => props.theme.enphasis};
    }
  }
`

export const FlexArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ViewOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const IconView = styled.div<IconViewProps>`
  svg {
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 6px;

    ${(props) =>
      props.isCurrentView
        ? css`
            background-color: ${props.theme.enphasis};
          `
        : css`
            &:hover {
              background-color: ${(props) => props.theme.cardBgSecondary};
            }
          `}
  }
`

export const InputText = styled.input`
  border-radius: 6px;
  outline: 0;
  height: 1.8rem;
  padding: 1rem 1rem;
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.borderCard};
  color: ${(props) => props.theme.textPrimary};

  &:focus {
    outline: 2px solid ${(props) => props.theme.enphasis};
  }
`

export const TasksArea = styled.section`
  width: calc(100vw - 24rem);
  height: fit-content;
  overflow: auto;
`

export const TasksListArea = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const TaskListByStatus = styled.div<TaskListByStatusProps>`
  padding: 0 1rem;
  border-radius: 6px;
  background-color: ${(props) => hexToRgba(props.theme.opened, 0.02)};

  ${(props) =>
    props.status === 'opened' &&
    css`
      border-left: 4px solid ${(props) => props.theme.opened};
    `}

  ${(props) =>
    props.status === 'stand_by' &&
    css`
      border-left: 4px solid ${(props) => props.theme.stand_by};
    `}

    ${(props) =>
    props.status === 'in_progress' &&
    css`
      border-left: 4px solid ${(props) => props.theme.in_progress};
    `}

    ${(props) =>
    props.status === 'approval' &&
    css`
      border-left: 4px solid ${(props) => props.theme.approval};
    `}

    ${(props) =>
    props.status === 'payment' &&
    css`
      border-left: 4px solid ${(props) => props.theme.payment};
    `}

    
    ${(props) =>
    props.status === 'concluded' &&
    css`
      border-left: 4px solid ${(props) => props.theme.concluded};
    `}
`

export const ListViewTableHeader = styled.div<ListViewTableHeaderProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  div {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 60px;
    ${(props) =>
      props.status === 'opened' &&
      css`
        background-color: ${(props) => props.theme.opened};
      `}
    ${(props) =>
      props.status === 'stand_by' &&
      css`
        background-color: ${(props) => props.theme.stand_by};
      `}
      ${(props) =>
      props.status === 'in_progress' &&
      css`
        background-color: ${(props) => props.theme.in_progress};
      `}
      ${(props) =>
      props.status === 'approval' &&
      css`
        background-color: ${(props) => props.theme.approval};
      `}
      ${(props) =>
      props.status === 'payment' &&
      css`
        background-color: ${(props) => props.theme.payment};
      `}
      ${(props) =>
      props.status === 'concluded' &&
      css`
        background-color: ${(props) => props.theme.concluded};
      `}
  }
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

export const ListViewTableBody = styled.tbody``

export const TaskTable = styled.table`
  border-collapse: separate;
  border-spacing: 1rem;
`

export const TableHeader = styled.thead`
  background-color: ${(props) => props.theme.cardBgPrimary};
`

export const StatusHeader = styled.th<StatusHeaderProps>`
  padding: 0.5rem;
  border-radius: 6px;

  ${(props) =>
    props.status === 'opened' &&
    css`
      border-top: 3px solid ${props.theme.opened};
    `}

  ${(props) =>
    props.status === 'stand_by' &&
    css`
      border-top: 3px solid ${props.theme.stand_by};
    `}

    ${(props) =>
    props.status === 'in_progress' &&
    css`
      border-top: 3px solid ${props.theme.in_progress};
    `}

    ${(props) =>
    props.status === 'approval' &&
    css`
      border-top: 3px solid ${props.theme.approval};
    `}

    ${(props) =>
    props.status === 'payment' &&
    css`
      border-top: 3px solid ${props.theme.payment};
    `}

    ${(props) =>
    props.status === 'concluded' &&
    css`
      border-top: 3px solid ${props.theme.concluded};
    `}
`

export const TableBody = styled.tbody`
  tr {
    td {
      min-width: 20rem;
    }
  }
`

export const CardsArea = styled.div`
  height: calc(100vh - 16rem);
  padding-right: 0.5rem;
  width: fit-content;
  gap: 1rem;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: start;
`
