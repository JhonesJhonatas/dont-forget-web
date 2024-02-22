import styled from 'styled-components'
interface ProgressIndicatorProps {
  $progress: string
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    font-weight: 500;
  }
`

export const ProgressRoot = styled.div`
  width: 100%;
  height: 1.25rem;
  background-color: ${(props) => props.theme.cardBgPrimary};
  border-radius: 9999px;
  overflow: hidden;
`

export const ProgressIndicator = styled.div<ProgressIndicatorProps>`
  width: ${(props) => props.$progress};
  height: 100%;
  background-color: ${(props) => props.theme.enphasis};

  transition: width 660ms cubic-bezier(0.65, 0, 0.35, 1);
`
