import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { ConcludedTask } from '../../contexts/TaskContext'

interface UseGetAllConcludedTasksByProjectIdProps {
  projectId: string
}

export const useGetAllConcludedTasksByProjectId = ({
  projectId,
}: UseGetAllConcludedTasksByProjectIdProps) => {
  const [concludedTasksIsLoading, setConcludedTasksIsLoading] = useState(true)
  const [allConcludedTasks, setAllConcludedTasks] = useState<ConcludedTask[]>(
    [],
  )

  const handleUpdateConcludedTasks = useCallback(() => {
    setConcludedTasksIsLoading(true)
    api
      .get(`/tasks/list-concluded-tasks-by-project-id/${projectId}`)
      .then((res) => setAllConcludedTasks(res.data))
      .finally(() => setConcludedTasksIsLoading(false))
  }, [projectId])

  useEffect(() => {
    handleUpdateConcludedTasks()
  }, [handleUpdateConcludedTasks])

  return {
    handleUpdateConcludedTasks,
    concludedTasksIsLoading,
    allConcludedTasks,
  }
}
