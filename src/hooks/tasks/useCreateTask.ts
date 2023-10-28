import { formatISO, parseISO } from 'date-fns'
import { useCallback } from 'react'
import { z } from 'zod'
import { api } from '../../lib/axios'

const newTaskDataSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  description: z.string(),
  maturity: z.string(),
  priority: z.string(),
})

type NewTAskDAtaSchema = z.infer<typeof newTaskDataSchema>

export const useCreateTask = () => {
  const createTask = useCallback(
    async ({
      description,
      maturity,
      priority,
      projectId,
      title,
    }: NewTAskDAtaSchema) => {
      const formattedData = {
        description,
        priority,
        projectId,
        title,
        status: 'toDo',
        maturity: formatISO(parseISO(maturity)),
      }

      try {
        const taskCreated = await api.post('/tasks/create-task', {
          ...formattedData,
        })

        if (taskCreated) {
          return true
        }
      } catch (err) {
        return false
      }
    },
    [],
  )

  return {
    createTask,
  }
}
