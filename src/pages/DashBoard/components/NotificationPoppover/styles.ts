import styled from 'styled-components'
import * as Poppover from '@radix-ui/react-popover'

export const PoppoverContent = styled(Poppover.Content)`
  min-width: 20rem;
  max-width: 40rem;
  max-height: 36rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBgPrimary};
  border-radius: 6px;
  outline: none;
  border: none;
  margin-right: 2rem;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: start;

  span {
    font-size: 0.75rem;
  }
`

export const NoNotificationsMessage = styled(Poppover.Content)`
  min-width: 20rem;
  min-height: 10rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBgPrimary};
  border-radius: 6px;
  outline: none;
  border: none;
  margin-right: 2rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  span {
    font-size: 0.75rem;
  }
`
