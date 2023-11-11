import styled, { css } from 'styled-components'

interface BoxColorProps {
  $isOpen: boolean
}

export const BoxColors = styled.div<BoxColorProps>`
  ${(props) =>
    props.$isOpen
      ? css`
          display: grid;
        `
      : css`
          display: none;
        `}
  margin-top: 1rem;
  position: absolute;
  background-color: ${(props) => props.theme.cardBgPrimary};
  padding: 0.5rem;
  border-radius: 6px;

  grid-template-columns: 1fr 1fr;
`
