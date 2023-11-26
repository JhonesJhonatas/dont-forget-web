import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  border: 0;
  background-color: ${(props) => props.theme.enphasis};
  color: ${(props) => props.theme.textPrimary};
  padding: 1rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    height: 1rem;
    width: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.enphasisHover};
  }
`

export const InputElement = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  input {
    width: 100%;
    border-radius: 6px;
    outline: 0;
    height: 1.8rem;
    padding: 1.5rem 1rem;
    background-color: ${(props) => props.theme.cardBgPrimary};
    border: 1px solid ${(props) => props.theme.borderCard};
    color: ${(props) => props.theme.textPrimary};

    &:focus {
      outline: 2px solid ${(props) => props.theme.enphasis};
    }
  }

  textarea {
    width: 100%;
    resize: none;
    min-height: 6rem;
    border-radius: 6px;
    outline: 0;
    height: 1.8rem;
    padding: 1rem;
    background-color: ${(props) => props.theme.cardBgPrimary};
    border: 1px solid ${(props) => props.theme.borderCard};
    color: ${(props) => props.theme.textPrimary};

    &:focus {
      outline: 2px solid ${(props) => props.theme.enphasis};
    }
  }

  small {
    color: ${(props) => props.theme.error};
  }
`
