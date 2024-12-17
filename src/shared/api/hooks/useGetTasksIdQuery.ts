import { useQuery } from '@tanstack/react-query'

import type { GetTasksIdParams } from '../requests'
import { getTasksId } from '../requests'

export const useGetTasksIdQuery = (
  params: GetTasksIdParams,
  settings?: QuerySettings<typeof getTasksId>
) =>
  useQuery({
    queryKey: ['getTasksId', params],
    queryFn: () => getTasksId({ params, config: settings?.config }),
    ...settings?.options
  })
