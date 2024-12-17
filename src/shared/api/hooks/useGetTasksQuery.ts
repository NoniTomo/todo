import { useInfiniteQuery } from '@tanstack/react-query'

import type { GetTasksParams } from '../requests'
import { getTasks } from '../requests'

export const useGetTasksInfiniteQuery = (
  params: GetTasksParams,
  settings?: InfinityQuerySettings<typeof getTasks>
) =>
  useInfiniteQuery({
    queryKey: ['getTasksId', params],
    queryFn: ({ pageParam }) =>
      getTasks({
        params: { ...params, pagination: { ...params.pagination, page: pageParam } },
        config: settings?.config
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.meta.pagination
      return pagination.page + 1 <= pagination.total ? pagination.page + 1 : undefined
    },
    ...settings
  })
