import { Route, Routes } from 'react-router-dom'
import { AllTasks } from './pages/AllTasks'
import { DefaulLayout } from './layouts/DefaultLayout'
import { DashBoard } from './pages/DashBoard'
import { Settings } from './pages/Settings'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'
import { TasksByProjects } from './pages/TasksByProjects'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-user" element={<CreateUser />} />

      <Route path="/" element={<DefaulLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/tasks">
          <Route path="all" element={<AllTasks />} />
          <Route path=":projectId" element={<TasksByProjects />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
