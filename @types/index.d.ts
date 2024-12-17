type Status = 'completed' | 'not_completed'

type TaskBackend = {
  name: string
  description: string
  status: Status
  createdAt: string
  updatedAt: string
  publishedAt: string
}

type TaskListResponseDataItem = {
  id: number
  attributes: TaskBackend
}

type Task = TaskBackend & { id: number; important: boolean }
