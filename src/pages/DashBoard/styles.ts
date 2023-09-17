import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 2rem;
`

export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

export const NewTaskButton = styled.button`
  border: 0;
  background-color: ${(props) => props.theme.enphasis};
  color: ${(props) => props.theme.textPrimary};
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    height: 1rem;
    width: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.enphasisHover};
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

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1rem;
  height: 100%;
`

export const Pagination = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 0.25rem;

  button {
    border: none;
    width: 2rem;
    height: 2rem;
    background-color: ${(props) => props.theme.cardBgPrimary};
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    line-height: 0;
    border-radius: 6px;

    &:hover {
      background-color: ${(props) => props.theme.borderCard};
    }
  }
`
