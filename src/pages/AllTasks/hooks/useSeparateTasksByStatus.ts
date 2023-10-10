import { useEffect, useState } from 'react'
import { TaskSchema } from '../../../hooks/useGetTasks'

interface TasksByStatusProps {
  tasks: TaskSchema[]
}

export const useSeparateTasksById = ({ tasks }: TasksByStatusProps) => {
  const [openedTasks, setOpenedTasks] = useState<TaskSchema[]>([])
  const [inProgressTasks, setInProgressTasks] = useState<TaskSchema[]>([])
  const [standByTasks, setStandByTasks] = useState<TaskSchema[]>([])
  const [approvalTasks, setApprovalTasks] = useState<TaskSchema[]>([])
  const [paymentTasks, setPaymentTasks] = useState<TaskSchema[]>([])
  const [concludedTasks, setConcludedTasks] = useState<TaskSchema[]>([])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'opened')

    setOpenedTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'stand_by')

    setStandByTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'in_progress')

    setInProgressTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'approval')

    setApprovalTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'payment')

    setPaymentTasks(filteredTasks)
  }, [tasks])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.status === 'concluded')

    setConcludedTasks(filteredTasks)
  }, [tasks])

  return {
    openedTasks,
    inProgressTasks,
    standByTasks,
    approvalTasks,
    paymentTasks,
    concludedTasks,
  }
}
