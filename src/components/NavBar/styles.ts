import styled from 'styled-components'

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
      background-color: ${(props) => props.theme.enphasis};
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
  gap: 0.5rem;
`

export const NavItem = styled.div`
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
