import styled, { css } from 'styled-components'

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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
    border: 1px solid ${(props) => props.theme.textSecondary};
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
  width: 76.5vw;
  height: fit-content;
  overflow: auto;
`

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
      border-top: 3px solid ${props.theme.textSecondary};
    `}

  ${(props) =>
    props.status === 'stand_by' &&
    css`
      border-top: 3px solid ${props.theme.borderCard};
    `}

    ${(props) =>
    props.status === 'in_progress' &&
    css`
      border-top: 3px solid ${props.theme.enphasis};
    `}

    ${(props) =>
    props.status === 'approval' &&
    css`
      border-top: 3px solid ${props.theme.danger};
    `}

    ${(props) =>
    props.status === 'payment' &&
    css`
      border-top: 3px solid ${props.theme.error};
    `}

    ${(props) =>
    props.status === 'concluded' &&
    css`
      border-top: 3px solid ${props.theme.sucess};
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
  height: 62vh;
  padding-right: 0.5rem;
  width: fit-content;
  gap: 1rem;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: start;
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
