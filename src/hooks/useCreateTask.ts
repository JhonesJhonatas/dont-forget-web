import { formatISO } from 'date-fns'
import { useCallback, useContext } from 'react'
import { z } from 'zod'
import { api } from '../lib/axios'
import { TaskContext } from '../contexts/TasksContext'

const userId = import.meta.env.VITE_USER_ID

const createNewTaskProps = z.object({
  taskTitle: z.string(),
  taskPriority: z.string(),
  taskMaturity: z.string(),
  taskDescription: z.string(),
})

type CreateNewTaksSchema = z.infer<typeof createNewTaskProps>

export const useCreateTask = () => {
  const { handleUpdateTasks } = useContext(TaskContext)

  const createNewTaks = useCallback(
    (data: CreateNewTaksSchema) => {
      const formattedData = {
        createdAt: formatISO(new Date()),
        maturity: formatISO(new Date(data.taskMaturity)),
        title: data.taskTitle,
        status: 'opened',
        priority: data.taskPriority,
        description: data.taskDescription,
        userId,
      }

      api
        .post('/tasks/create-new-task', {
          ...formattedData,
        })
        .then(() => {
          handleUpdateTasks()
        })
    },
    [handleUpdateTasks],
  )

  return {
    createNewTaks,
  }
}
