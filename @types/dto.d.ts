// RESPONSES
type GetTasksResponse = {
  data: TaskListResponseDataItem[]
  meta: {
    pagination: {
      page: integer
      pageSize: integer
      pageCount: integer
      total: integer
    }
  }
}

type TasksIdResponse = {
  data: TaskListResponseDataItem
  meta: {}
}

type PostTasksResponse = TasksIdResponse

type GetTasksIdResponse = TasksIdResponse

type PutTasksIdResponse = TasksIdResponse

// REQUESTS

type PostTasksRequest = {
  data: {
    name: string
    description: string
    status: string
  }
}

type PutTasksIdRequest = {
  data: {
    name: string
    description: string
    status: string
  }
}
