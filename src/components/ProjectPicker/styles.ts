import styled, { css } from 'styled-components'

interface OptionsFieldProps {
  $isOpen: boolean
}

export const Container = styled.div`
  width: 10rem;
  font-size: 0.75rem;
`

export const SelectorField = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.cardBgPrimary};
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.borderCard};
  }
`

export const ChoosedField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const SelectorControllers = styled.div``

export const OptionsField = styled.div<OptionsFieldProps>`
  ${(props) =>
    props.$isOpen
      ? css`
          width: 10rem;
          background-color: ${(props) => props.theme.cardBgPrimary};
          padding: 0.5rem;
          border-radius: 6px;

          margin-top: 0.5rem;
          position: absolute;
          z-index: 1;

          display: flex;
          align-items: center;
          gap: 0.75rem;
        `
      : css`
          display: none;
        `}
`

export const ListOfOptions = styled.ul`
  width: 100%;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    width: 100%;
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.borderCard};
    }
  }
`
