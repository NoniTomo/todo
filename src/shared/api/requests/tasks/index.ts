import qs from 'qs'

import { instance } from '@/src/shared/api/instance'

export type GetTasksParams = {
  pagination?: {
    withCount?: boolean
    page?: number
    pageSize?: number
    start?: number
    limit?: number
  }
  filters?: {
    name?: string
    description?: string
    status?: Status
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
  }
}

export type GetTasksRequestsConfig = RequestConfig<GetTasksParams>

export const getTasks = async ({ params, config }: GetTasksRequestsConfig) => {
  const queryString = qs.stringify(params, {
    encode: true,
    addQueryPrefix: true,
    arrayFormat: 'brackets'
  })

  return instance.get<GetTasksResponse>(`/tasks${queryString}`, config)
}

export type PostTasksRequestConfig = RequestConfig<PostTasksRequest>

export const postTasks = async ({ params, config }: PostTasksRequestConfig) =>
  instance.post<PostTasksResponse>('/tasks', params, config)
