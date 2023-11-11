import styled from 'styled-components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const DropDownContent = styled(DropdownMenu.Content)`
  background-color: ${(props) => props.theme.borderCard};
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const DropDownItem = styled(DropdownMenu.Item)`
  border: 0;
  outline: 0;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  span {
    font-size: 0.75rem;
  }

  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.cardBgPrimary};
  }
`
