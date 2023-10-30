import { useCallback } from 'react'
import { api } from '../../lib/axios'
import { formatISO, parseISO } from 'date-fns'

interface ConcludeTaskProps {
  taskId: string
  createdAt: string
  description: string
  maturity: string
  priority: string
  projectId: string
  status: string
  title: string
}

const useConcludeTask = () => {
  const concludeTask = useCallback(
    async ({
      createdAt,
      description,
      maturity,
      priority,
      projectId,
      status,
      taskId,
      title,
    }: ConcludeTaskProps) => {
      try {
        const concludedTask = await api.post('/tasks/conclude-task-by-id', {
          createdAt,
          description,
          maturity: formatISO(parseISO(maturity)),
          priority,
          projectId,
          status,
          taskId,
          title,
        })

        if (concludedTask) {
          return true
        }
      } catch (err) {
        return false
      }
    },
    [],
  )

  return {
    concludeTask,
  }
}

export { useConcludeTask }
