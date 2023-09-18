import { formatISO } from 'date-fns'
import { useCallback } from 'react'
import { z } from 'zod'
import { api } from '../lib/axios'

const createNewTaskProps = z.object({
  taskTitle: z.string(),
  taskPriority: z.string(),
  taskMaturity: z.string(),
  taskDescription: z.string(),
})
type CreateNewTaksSchema = z.infer<typeof createNewTaskProps>

export const useCreateTask = () => {
  const createNewTaks = useCallback((data: CreateNewTaksSchema) => {
    const formattedData = {
      createdAt: formatISO(new Date()),
      maturity: formatISO(new Date(data.taskMaturity)),
      title: data.taskTitle,
      status: 'opened',
      priority: data.taskPriority,
      description: data.taskDescription,
      userId: 'a98dc6b7-e0b3-47a7-a080-b7108ac62e8a',
    }

    api
      .post('/tasks/create-new-task', {
        ...formattedData,
      })
      .then(() => {
        console.log('Cadastrado com sucesso')
      })
  }, [])

  return {
    createNewTaks,
  }
}
