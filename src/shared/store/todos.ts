import { create } from 'zustand'

import { createSelectors } from './createSelector'

type State = {
  entities: Record<number, Task>
  ids: number[]
  idsImportant: number[]
}

type Action = {
  updateTask: (task: Task) => void
  stored: (tasks: Task[]) => void
  localDeleteTask: (id: number) => void
  setIdsImportant: (id: number[]) => void
  addTask: (task: Task) => void
}

const useTasksStoreBase = create<State & Action>((set) => ({
  entities: {},
  ids: [],
  idsImportant: [],
  stored: (tasks: Task[]) =>
    set((state) => {
      const tasksToEntities = (tasks: Task[]) => {
        return {
          entities: tasks.reduce(
            (entities, task) => {
              entities[task.id] = {
                ...task,
                important: Boolean(state.idsImportant.find((id) => id === task.id))
              }
              return entities
            },
            {} as Record<number, Task>
          ),
          ids: tasks.map((task) => task.id)
        }
      }
      const payload = tasksToEntities(tasks)

      return {
        ...state,
        entities: { ...payload.entities },
        ids: [...payload.ids]
      }
    }),
  createTask: (task: Task) => {
    set((state) => {
      return {
        ...state,
        entities: { ...state.entities, [task.id]: task },
        ids: [...state.ids, task.id]
      }
    })
  },
  localDeleteTask: (id: number) => {
    set((state) => {
      const newEntities = { ...state.entities }
      delete newEntities[id]
      return {
        ...newEntities,
        ids: state.ids.filter((currentId) => currentId !== id)
      }
    })
  },
  updateTask: (task: Task) => {
    set((state) => {
      return {
        ...state,
        entities: {
          ...state.entities,
          [task.id]: { ...state.entities[task.id], ...task }
        }
      }
    })
  },
  addTask: (task: Task) => {
    set((state) => {
      return {
        ...state,
        entities: {
          ...state.entities,
          [task.id]: { ...task }
        },
        ids: [task.id, ...state.ids]
      }
    })
  },
  setIdsImportant: (idsImportant: number[]) =>
    set((state) => ({
      ...state,
      idsImportant: [...idsImportant]
    }))
}))

export const useTasksStore = createSelectors(useTasksStoreBase)
