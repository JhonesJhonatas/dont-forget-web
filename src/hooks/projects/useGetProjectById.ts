import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { Project } from '../../contexts/TaskContext'

export const useGetProjectById = (projectId: string) => {
  const [projectIsLoading, setProjectIsLoading] = useState(false)
  const [project, setProject] = useState<Project>()

  const handleUpdateProject = useCallback(() => {
    setProjectIsLoading(true)

    api
      .get(`/projects/get-project-by-id/${projectId}`)
      .then((response) => setProject(response.data))
      .finally(() => {
        setProjectIsLoading(false)
      })
  }, [projectId])

  useEffect(() => {
    handleUpdateProject()
  }, [handleUpdateProject])

  return {
    projectIsLoading,
    handleUpdateProject,
    project,
  }
}
