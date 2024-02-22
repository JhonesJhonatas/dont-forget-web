import { useCallback, useEffect, useState } from 'react'
import { Container, ProgressIndicator, ProgressRoot } from './styles'
import { api } from '../../lib/axios'

interface ProjectProgressBarProps {
  projectId: string
}

export function ProjectProgressBar({ projectId }: ProjectProgressBarProps) {
  const [progress, setProgress] = useState(0)

  const handleUpdateProgress = useCallback(() => {
    api.get(`/projects/get-project-progress/${projectId}`).then((response) => {
      setProgress(response.data)
    })
  }, [projectId])

  useEffect(() => {
    const timer = setTimeout(() => handleUpdateProgress(), 500)
    return () => clearTimeout(timer)
  }, [handleUpdateProgress])

  return (
    <Container>
      <span>Progresso do Projeto:</span>
      <ProgressRoot>
        <ProgressIndicator
          $progress={`${progress.toString()}%`}
        ></ProgressIndicator>
      </ProgressRoot>
    </Container>
  )
}
