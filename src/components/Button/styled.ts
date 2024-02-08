import styled, { css } from 'styled-components'

interface StyledButtonProps {
  $typeColor?: 'sucess' | 'error' | 'alert' | 'cancel'
}

export const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.theme.enphasis};
  color: ${(props) => props.theme.textPrimary};

  &:focus {
    border: 2px solid ${(props) => props.theme.enphasisHover};
  }

  ${(props) =>
    props.$typeColor === 'cancel'
      ? css`
          background-color: transparent;
          color: ${(props) => props.theme.borderCard};

          &:not(:disabled):hover {
            color: ${(props) => props.theme.textSecondary};
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        `
      : null}

  ${(props) =>
    props.$typeColor === 'sucess'
      ? css`
          background-color: ${(props) => props.theme.sucess};
          color: ${(props) => props.theme.textPrimary};

          &:not(:disabled):hover {
            background-color: ${(props) => props.theme.sucessHover};
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        `
      : null}

${(props) =>
    props.$typeColor === 'error'
      ? css`
          background-color: ${(props) => props.theme.error};
          color: ${(props) => props.theme.textPrimary};

          &:not(:disabled):hover {
            background-color: ${(props) => props.theme.errorHover};
          }

          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        `
      : null}
`
