import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 6px;
  padding: 1rem;

  background-color: ${(props) => props.theme.cardBgSecondary};
`

export const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  svg {
    cursor: pointer;
    color: ${(props) => props.theme.textSecondary};
    transition: all 0.4s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.textPrimary};
    }
  }
`

export const ProjectDescription = styled.div`
  max-height: 8rem;
  overflow: auto;
`

export const DescriptionSpan = styled.span`
  color: ${(props) => props.theme.textSecondary};
`

export const ProjectResumeArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`
