import styled, { css } from 'styled-components'

interface InputElementProps {
  hasError?: boolean
}

export const Container = styled.div`
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`

export const InputElement = styled.label<InputElementProps>`
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
    color: ${(props) => props.theme.textPrimary};

    ${(props) =>
      props.hasError
        ? css`
            border: 2px solid ${(props) => props.theme.error};

            &:focus {
              outline: 2px solid ${(props) => props.theme.errorHover};
            }
          `
        : css`
            border: 1px solid ${(props) => props.theme.borderCard};

            &:focus {
              outline: 2px solid ${(props) => props.theme.enphasis};
            }
          `}
  }

  small {
    color: ${(props) => props.theme.error};
  }
`

export const SubmitButton = styled.button`
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
