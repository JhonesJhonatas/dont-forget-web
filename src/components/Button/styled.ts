import styled, { css } from 'styled-components'

interface StyledButtonProps {
  typeColor?: 'sucess' | 'error' | 'alert' | 'cancel'
}

export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  outline: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.typeColor === 'cancel'
      ? css`
          background-color: transparent;
          color: ${(props) => props.theme.borderCard};

          &:hover {
            color: ${(props) => props.theme.textSecondary};
          }
        `
      : null}

  ${(props) =>
    props.typeColor === 'sucess'
      ? css`
          background-color: ${(props) => props.theme.sucess};
          color: ${(props) => props.theme.textPrimary};

          &:hover {
            background-color: ${(props) => props.theme.sucessHover};
          }
        `
      : null}
`
