import styled from 'styled-components'

export const Container = styled.div`
  width: 60vw;
  height: 70vh;
  background-color: ${(props) => props.theme.cardBgPrimary};
  border-radius: 6px;
  overflow: hidden;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const CreateUserBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`

export const BoxBanner = styled.div`
  overflow: hidden;
  img {
    max-width: 100%;
  }
`

export const FormArea = styled.div`
  width: 100%;
  padding: 2rem 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`

export const Header = styled.div`
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.span`
  font-size: 2rem;
`

export const BackToLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  span {
    font-size: 0.75rem;
  }

  &:hover {
    color: ${(props) => props.theme.enphasis};
  }
`

export const InputElement = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;

  input {
    border-radius: 6px;
    outline: 0;
    height: 1.8rem;
    padding: 1.5rem 1rem;
    background-color: ${(props) => props.theme.cardBgSecondary};
    border: 1px solid ${(props) => props.theme.borderCard};
    color: ${(props) => props.theme.textPrimary};

    &:focus {
      outline: 2px solid ${(props) => props.theme.enphasis};
    }
  }
`

export const FlexArea = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`

export const SubmitButton = styled.button`
  border: 0;
  background-color: ${(props) => props.theme.enphasis};
  color: ${(props) => props.theme.textPrimary};
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    height: 1rem;
    width: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.enphasisHover};
  }
`
