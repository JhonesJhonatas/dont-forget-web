import { Route, Routes } from 'react-router-dom'
import { CreateUser } from '../pages/CreateUser'
import { DefaulLayout } from '../layouts/DefaultLayout'
import { DashBoard } from '../pages/DashBoard'
import { AllTasks } from '../pages/AllTasks'
import { Login } from '../pages/Login'
import { TasksByProjects } from '../pages/TasksByProjects'
import { ProjectViewer } from '../pages/ProjectViewer'
import { ProjectSettings } from '../pages/ProjectSettings'
import { Settings } from '../pages/Settings'
import { PrivateRoute } from './PrivateRoute'
import { MyWeek } from '../pages/MyWeek'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-user" element={<CreateUser />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DefaulLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/my-week" element={<MyWeek />} />
          <Route path="/tasks">
            <Route path="all" element={<AllTasks />} />
            <Route path=":projectId" element={<TasksByProjects />} />
          </Route>
          <Route
            path="/project-viewer/:projectId"
            element={<ProjectViewer />}
          />
          <Route
            path="/project-settings/:projectId"
            element={<ProjectSettings />}
          />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  )
}
