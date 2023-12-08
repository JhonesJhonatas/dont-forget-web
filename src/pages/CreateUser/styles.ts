import styled from 'styled-components'

export const Container = styled.div`
  max-width: 55vw;
  max-height: 70vh;
  background-color: ${(props) => props.theme.cardBgSecondary};
  border: 1px solid ${(props) => props.theme.cardBgPrimary};
  border-radius: 6px;
  overflow: hidden;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
