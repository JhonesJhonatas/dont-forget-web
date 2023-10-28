import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'

interface ProjectSchema {
  id: string
  title: string
  description: string
  color: string
  createdAt: string
  userId: string
}

export const useGetProjects = () => {
  const [projectsIsLoading, setProjectsIsLoading] = useState(true)
  const [allProjects, setAllProjects] = useState<ProjectSchema[]>([])

  const handleUpdateProjects = useCallback(() => {
    setProjectsIsLoading(true)
    api
      .get('/projects/list-projects')
      .then((res) => setAllProjects(res.data))
      .finally(() => setProjectsIsLoading(false))
  }, [])

  useEffect(() => {
    handleUpdateProjects()
  }, [handleUpdateProjects])

  return {
    projectsIsLoading,
    allProjects,
    handleUpdateProjects,
  }
}
