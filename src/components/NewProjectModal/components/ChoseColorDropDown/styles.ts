import styled from 'styled-components'
import * as DropDownMenu from '@radix-ui/react-dropdown-menu'

interface DropDownMenuItemProps {
  $circleColor: string
}

export const DropDownContent = styled(DropDownMenu.Content)`
  background-color: ${(props) => props.theme.borderCard};
  border-radius: 6px;
  padding: 1rem;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  position: absolute;
  z-index: 1;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

export const DropDownItem = styled(DropDownMenu.Item)<DropDownMenuItemProps>`
  border: 0;
  outline: 0;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.borderCard};
  }

  svg {
    color: ${(props) => props.$circleColor};
  }
`
