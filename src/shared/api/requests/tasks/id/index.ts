import { instance } from '@/src/shared/api/instance'

export type GetTasksIdParams = {
  id: number
}

export type GetTasksIdRequestConfig = RequestConfig<GetTasksIdParams>

export const getTasksId = async ({ params, config }: GetTasksIdRequestConfig) =>
  instance.get<GetTasksIdResponse>(`/tasks/${params.id}`, config)

export type PutTasksIdParams = {
  id: number
} & PutTasksIdRequest

export type PutTasksIdRequestConfig = RequestConfig<PutTasksIdParams>

export const putTasksId = async ({ params, config }: PutTasksIdRequestConfig) =>
  instance.put<PutTasksIdResponse>(`/tasks/${params.id}`, { ...params, id: undefined }, config)

export type DeleteTasksIdParams = {
  id: number
}

export type DeleteTasksIdRequestConfig = RequestConfig<DeleteTasksIdParams>

export const deleteTasksId = async ({ params, config }: DeleteTasksIdRequestConfig) =>
  instance.delete<null>(`/tasks/${params.id}`, config)
