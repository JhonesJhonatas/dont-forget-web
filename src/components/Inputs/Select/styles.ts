import styled from 'styled-components'

export const StyledLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-size: 0.75rem;
  }

  select {
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.cardBgPrimary};
    padding: 0.5rem;
    border-radius: 6px;
    color: ${(props) => props.theme.textPrimary};

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  select option {
  }
`
