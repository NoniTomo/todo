import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Error, Root } from '../pages'

import { useTasksStore } from './shared/store/todos'
import { ROUTES } from './constants'

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,

    element: <Navigate to={ROUTES.TASKS} />,
    errorElement: <Error />
  },
  {
    path: ROUTES.TASKS,
    element: <Root />,
    loader: () => {
      const storedIds = localStorage.getItem('idsImportant')

      let idsImportant = JSON.parse(storedIds ?? '')
      if (!Array.isArray(idsImportant)) {
        localStorage.setItem('idsImportant', JSON.stringify([]))
        idsImportant = []
      }
      const setIdsImportant = useTasksStore.getState().setIdsImportant

      setIdsImportant(idsImportant)

      return null
    },
    errorElement: <Error />
  }
])
