import { useCallback } from 'react'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { formatISO, parseISO } from 'date-fns'

const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  maturity: z.string(),
  priority: z.string(),
  projectId: z.string(),
  status: z.string(),
})

type UpdateTaskSchema = z.infer<typeof updateTaskSchema>

export const useUpdateOpenedTask = () => {
  const updateOpenedTask = useCallback(
    async ({
      description,
      id,
      maturity,
      priority,
      projectId,
      status,
      title,
    }: UpdateTaskSchema) => {
      try {
        const taskUpdated = await api.put('/tasks/edit-task-by-id', {
          description,
          id,
          maturity: formatISO(parseISO(maturity)),
          priority,
          projectId,
          status,
          title,
        })

        if (taskUpdated) {
          return true
        }
      } catch (err) {
        return false
      }
    },
    [],
  )

  return {
    updateOpenedTask,
  }
}
