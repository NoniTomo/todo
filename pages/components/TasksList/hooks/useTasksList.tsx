import React from 'react'

import { checkFilter } from '@/pages/helpers'
import { useGetTasksInfiniteQuery } from '@/src/shared/api'
import { useTasksStore } from '@/src/shared/store/todos'

export type UseTasksListProps = {
  filter: string
}

const DEFAULT_PAGINATION_PAGESIZE = 2

export const useTasksList = ({ filter }: UseTasksListProps) => {
  const stored = useTasksStore.use.stored()
  const ids = useTasksStore.use.ids()
  const entities = useTasksStore.use.entities()

  let status
  if (checkFilter(filter)) {
    if (filter === 'completed' || filter === 'not_completed') status = filter
    else status = undefined
  } else status = undefined

  const getTasksData = useGetTasksInfiniteQuery({
    filters: { status },
    pagination: { withCount: true, pageSize: DEFAULT_PAGINATION_PAGESIZE }
  })

  React.useEffect(() => {
    const tasks =
      getTasksData.data?.pages.reduce((tasks, page) => {
        return [
          ...tasks,
          ...page.data.data.map((task) => ({ id: task.id, ...task.attributes, important: false }))
        ]
      }, [] as Task[]) || []
    stored(tasks)
  }, [getTasksData.data?.pages])

  const observer = React.useRef<IntersectionObserver | null>(null)
  const lastNoteElementRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (getTasksData.isLoading || getTasksData.isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && getTasksData.hasNextPage) {
          getTasksData.fetchNextPage()
        }
      })

      if (node) observer.current.observe(node)
    },
    [getTasksData.isLoading, getTasksData.isFetching, getTasksData.hasNextPage]
  )

  const tasksStore = ids.map((id) => entities[id])
  return {
    state: {
      ...getTasksData,
      tasks: tasksStore,
      lastNoteElementRef
    }
  }
}
