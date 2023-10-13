import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Container } from './styles'

export function SkeletonLoading() {
  return (
    <Container>
      <Skeleton
        baseColor="#3F3F46"
        highlightColor="#71717A"
        height={150}
        width={330}
        borderRadius={6}
      />
      <Skeleton
        baseColor="#3F3F46"
        highlightColor="#71717A"
        height={150}
        width={330}
        borderRadius={6}
      />
      <Skeleton
        baseColor="#3F3F46"
        highlightColor="#71717A"
        height={150}
        width={330}
        borderRadius={6}
      />
    </Container>
  )
}
