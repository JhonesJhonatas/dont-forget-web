import styled from 'styled-components'

export const Container = styled.nav`
  height: fit-content;
  background-color: ${(props) => props.theme.cardBgSecondary};
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.borderCard};

  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const CardHedaer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  img {
    max-width: 8rem;
    max-height: 8rem;
    border-radius: 200px;
  }

  span {
    font-size: 1.25rem;
    font-weight: bold;
  }
`

export const NavItemsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const NavItem = styled.div`
  a {
    text-decoration: none;
    color: ${(props) => props.theme.textPrimary};
    background-color: ${(props) => props.theme.cardBgPrimary};
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.2s ease-in-out;

    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.borderCard};
    }

    &.active {
      background-color: ${(props) => props.theme.textSecondary};
    }
  }
`

export const NewTaskButton = styled.button`
  border: 0;
  border-radius: 6px;
  padding: 1rem;
  background-color: ${(props) => props.theme.enphasis};
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.enphasisHover};
  }
`
