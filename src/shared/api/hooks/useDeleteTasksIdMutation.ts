import { useMutation } from '@tanstack/react-query'

import type { DeleteTasksIdRequestConfig } from '../requests'
import { deleteTasksId } from '../requests'

export const useDeleteTasksIdMutation = (
  settings?: MutationSettings<DeleteTasksIdRequestConfig, typeof deleteTasksId>
) =>
  useMutation({
    mutationKey: ['deleteTasksId'],
    mutationFn: ({ params, config }) =>
      deleteTasksId({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
