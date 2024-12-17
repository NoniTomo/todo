import { useMutation } from '@tanstack/react-query'

import type { PutTasksIdRequestConfig } from '../requests'
import { putTasksId } from '../requests'

export const usePutTasksIdMutation = (
  settings?: MutationSettings<PutTasksIdRequestConfig, typeof putTasksId>
) =>
  useMutation({
    mutationKey: ['putTasksId'],
    mutationFn: ({ params, config }) =>
      putTasksId({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
