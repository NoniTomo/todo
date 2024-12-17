import { useMutation } from '@tanstack/react-query'

import type { PostTasksRequestConfig } from '../requests'
import { postTasks } from '../requests'

export const usePostTasksMutation = (
  settings?: MutationSettings<PostTasksRequestConfig, typeof postTasks>
) =>
  useMutation({
    mutationKey: ['postTasks'],
    mutationFn: ({ params, config }) =>
      postTasks({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
