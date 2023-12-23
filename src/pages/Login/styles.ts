import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;
`

export const HandleArea = styled.div`
  background-color: ${(props) => props.theme.cardBgPrimary};
  border-radius: 6px;
  width: 30vw;
  padding: 2rem;
  max-width: 30rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const LogoArea = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 40%;
  }
`

export const InputElement = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  input {
    width: 100%;
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

export const PasswordInputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: end;

  svg {
    cursor: pointer;
    position: absolute;
    margin-right: 0.5rem;
  }
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

export const FooterInputs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  span {
    font-size: 13px;
    color: ${(props) => props.theme.textPrimary};
  }
`

export const FooterLink = styled.span`
  font-size: 13px;
  cursor: pointer;
  color: ${(props) => props.theme.textPrimary};

  &:hover {
    color: ${(props) => props.theme.enphasis};
  }
`

export const ImgArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;

  span {
    font-size: 3rem;
    font-weight: bold;
    width: 60%;
  }

  img {
    min-width: 80%;
    max-width: 100%;
  }
`
