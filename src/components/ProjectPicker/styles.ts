import styled from 'styled-components'

interface ContainerProps {
  $projectColor?: string
}

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.theme.cardBgPrimary};
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

  svg {
    color: ${(props) => props.$projectColor};
  }

  span {
    font-size: 0.75rem;
  }
`
