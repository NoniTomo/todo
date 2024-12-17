import styled from 'styled-components'

import { CreateTaskCard } from './components/CreateTaskCard/CreateTaskCard'
import { SelectFilter } from './components/SelectFilter/SelectFilter'
import { TasksList } from './components/TasksList/TasksList'
import { useRoot } from './hooks/useRoot'

export const Layout = styled.div`
  max-width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 900px) {
    max-width: 700px;
    margin: auto;
  }
`

export const Root = () => {
  const { state, functions } = useRoot()

  return (
    <Layout>
      <CreateTaskCard />
      <SelectFilter value={state.value} handleChange={functions.handleChange} />
      {!state.isImportant && <TasksList filter={state.filter} isPending={state.isPending} />}
    </Layout>
  )
}
