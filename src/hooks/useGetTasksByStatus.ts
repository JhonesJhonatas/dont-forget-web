import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

type StatusSchema =
  | 'opened'
  | 'stand_by'
  | 'in_progress'
  | 'approval'
  | 'payment'
  | 'concluded'

interface TaskSchema {
  id: string
  createdAt: Date
  maturity: Date
  completedAt: Date
  title: string
  status: StatusSchema
  priority: 'normal' | 'high' | 'urgent'
  description: string
  userId: string
}

export const useGetTasksByStatus = (status: StatusSchema) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskSchema[]>([])
  const [tasksIsLoading, setTasksIsLoading] = useState(false)

  useEffect(() => {
    try {
      setTasksIsLoading(true)
      api
        .get(`tasks/get-tasks-by-status/${status}`)
        .then((res) => {
          setFilteredTasks(res.data)
        })
        .finally(() => {
          setTasksIsLoading(false)
        })
    } catch (err) {
      console.log(err)
    }
  }, [status])

  return {
    filteredTasks,
    tasksIsLoading,
  }
}
