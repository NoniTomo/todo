import { Skeleton } from 'antd'
import styled from 'styled-components'

import { TaskCard } from '@/src/shared/components/TaskCard/TaskCard'

import { useTasksList } from './hooks/useTasksList'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export type TasksListProps = {
  filter: string
  isPending: boolean
}

export const TasksList = ({ filter, isPending }: TasksListProps) => {
  const { state } = useTasksList({ filter })

  return (
    <List>
      {!(state.isLoading || isPending) && (
        <>
          {state.tasks.map((task) => (
            <TaskCard id={task.id} key={task.id} />
          ))}
          <div ref={state.lastNoteElementRef} />
        </>
      )}
      {!!(state.isFetchingNextPage || isPending) && <Skeleton.Node style={{ width: '100%' }} />}
    </List>
  )
}
