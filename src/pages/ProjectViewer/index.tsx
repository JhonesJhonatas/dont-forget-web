import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  DescriptionSpan,
  Header,
  ProjectDescription,
  ProjectResumeArea,
  ProjectTitle,
} from './styles'
import { useGetProjectById } from '../../hooks/projects/useGetProjectById'
import { Folder, Gear } from '@phosphor-icons/react'
import { ResumeCard } from '../../components/ResumeCard'
import { useGetAllOpenedTasksByProject } from '../../hooks/tasks/useGetAllOpenedTasksByProject'
import { useGetAllConcludedTasksByProjectId } from '../../hooks/tasks/useGetAllConcludedTasksByProjectId'
import { useSeparateOpenedTasksByStatus } from '../../hooks/tasks/useSeparateOpenedTasksByStatus'
import { useCallback } from 'react'
import { ProjectProgressBar } from '../../components/ProjectProgressBar'

type RouterParams = {
  projectId: string
}

export function ProjectViewer() {
  const { projectId } = useParams<RouterParams>()

  const capturedProjectId = projectId || ''

  const { allOpenedTasks } = useGetAllOpenedTasksByProject({
    projectId: capturedProjectId,
  })
  const { allConcludedTasks } = useGetAllConcludedTasksByProjectId({
    projectId: capturedProjectId,
  })
  const navigate = useNavigate()

  const {
    approvalTasks,
    inProgressTasks,
    paymentTasks,
    standByTasks,
    toDoTasks,
  } = useSeparateOpenedTasksByStatus(allOpenedTasks)

  const { project } = useGetProjectById(capturedProjectId)

  const handleNavigateTo = useCallback(
    (path: string) => {
      navigate(path)
    },
    [navigate],
  )

  return (
    <Container>
      <Header>
        <ProjectTitle>
          <div>
            <Folder weight="fill" color={project?.color} size={30} />
            <h2>{project?.title}</h2>
          </div>
          <Gear
            size={24}
            onClick={() =>
              handleNavigateTo(`/project-settings/${capturedProjectId}`)
            }
          />
        </ProjectTitle>

        <ProjectDescription>
          {project?.description ? (
            <DescriptionSpan>{project?.description}</DescriptionSpan>
          ) : (
            <DescriptionSpan>
              Este projeto ainda não possui descrição
            </DescriptionSpan>
          )}
        </ProjectDescription>
      </Header>

      <ProjectProgressBar projectId={projectId as string} />

      <ProjectResumeArea>
        <ResumeCard amount={toDoTasks.length} status="opened" />
        <ResumeCard amount={standByTasks.length} status="stand_by" />
        <ResumeCard amount={inProgressTasks.length} status="in_progress" />
        <ResumeCard amount={approvalTasks.length} status="approval" />
        <ResumeCard amount={paymentTasks.length} status="payment" />
        <ResumeCard amount={allConcludedTasks.length} status="concluded" />
      </ProjectResumeArea>
    </Container>
  )
}
