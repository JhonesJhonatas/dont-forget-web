import styled from 'styled-components'

interface ProjectItemProps {
  $projectColor: string
}

export const Container = styled.nav`
  height: 100%;
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 2rem 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const NavHeader = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.cardBgPrimary};

  display: flex;
  align-items: start;
  justify-content: space-between;

  svg {
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.borderCard};
    }
  }
`

export const UserInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 60px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`

export const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`

export const UserEmail = styled.span`
  font-size: 0.7rem;
  font-weight: 300;
`

export const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.5rem;
`

export const NavItem = styled.div`
  width: 100%;

  a {
    padding: 0.5rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    color: ${(props) => props.theme.textPrimary};

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.cardBgPrimary};
    }

    &.active {
      background-color: ${(props) => props.theme.enphasis};
    }
  }
`

export const ProjectsArea = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.cardBgPrimary};
  border-radius: 6px;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ProjectsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg:last-child {
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`

export const ProjectsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ProjectsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const ProjectItem = styled.div<ProjectItemProps>`
  width: 100%;
  padding: 0.1rem 0.5rem;
  border-radius: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: ${(props) => props.theme.borderCard};
  }

  a {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    color: ${(props) => props.theme.textPrimary};
    padding: 0.25rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${(props) => props.$projectColor};
    }

    svg:last-child {
      display: none;
    }

    &.active {
      svg:last-child {
        display: flex;
        color: ${(props) => props.theme.enphasis};
      }
    }
  }
`

export const ProjectController = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg:first-child {
    color: ${(props) => props.theme.textSecondary};
  }

  svg:last-child {
    cursor: pointer;
    line-height: 0;
    color: ${(props) => props.theme.textSecondary};
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${(props) => props.theme.textPrimary};
    }
  }
`

export const NewProject = styled.div`
  width: 100%;
  padding: 0.1rem 0.4rem;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  border: 1px dashed ${(props) => props.theme.cardBgPrimary};

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.cardBgPrimary};
    color: ${(props) => props.theme.textPrimary};
  }

  &.active {
    background-color: ${(props) => props.theme.cardBgPrimary};
  }
`

export const NavFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  svg {
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.enphasis};
    }
  }
`

export const NewTaskButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 6px;
  background-color: ${(props) => props.theme.enphasis};
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`
