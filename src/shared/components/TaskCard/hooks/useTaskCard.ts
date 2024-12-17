import { useDeleteTasksIdMutation, usePutTasksIdMutation } from '@/src/shared/api'
import { useDebounceCallback, useSearchParams } from '@/src/shared/hooks'
import { useTasksStore } from '@/src/shared/store/todos'

export type UseTaskCardProps = {
  id: number
}

export const useTaskCard = ({ id }: UseTaskCardProps) => {
  const { searchParams } = useSearchParams()
  const putTaskIdMutation = usePutTasksIdMutation()
  const deleteTaskIdMutation = useDeleteTasksIdMutation()

  const task = useTasksStore.use.entities()[id]
  const updateTask = useTasksStore.use.updateTask()
  const localDeleteTask = useTasksStore.use.localDeleteTask()
  const setIdsImportant = useTasksStore.use.setIdsImportant()

  const onComplete = async (value: boolean) => {
    const data = await putTaskIdMutation.mutateAsync({
      params: {
        data: { ...task, status: value ? 'completed' : 'not_completed' },
        id
      }
    })
    if (
      searchParams[0].get('filter') === 'completed' ||
      searchParams[0].get('filter') === 'not_completed'
    )
      localDeleteTask(id)
    updateTask({ id: data.data.data.id, ...data.data.data.attributes, important: task.important })
  }

  const updateNameMutate = async (name: string) =>
    await putTaskIdMutation.mutateAsync({
      params: {
        data: { ...task, name },
        id
      }
    })

  const updateDescriptionMutate = async (description: string) =>
    await putTaskIdMutation.mutateAsync({
      params: {
        data: { ...task, description },
        id
      }
    })

  const onDescriptionChange = async (description: string) => {
    updateTask({ ...task, description, id })
    debounceUpdateDescriptionMutate(description)
  }

  const onNameChange = async (name: string) => {
    updateTask({ ...task, name, id })
    debounceUpdateNameMutate(name)
  }

  const onDelete = async () => {
    if (task.important) {
      let idsImportant = JSON.parse(localStorage.getItem('idsImportant') ?? '')
      idsImportant = idsImportant.filter((id: number) => id !== task.id)
      localStorage.setItem('idsImportant', JSON.stringify(idsImportant))
      setIdsImportant(idsImportant)
    }
    await deleteTaskIdMutation.mutateAsync({ params: { id: task.id } })
    localDeleteTask(id)
  }

  const onImportant = () => {
    updateTask({ ...task, important: !task.important })

    let idsImportant = JSON.parse(localStorage.getItem('idsImportant') ?? '')

    if (!task.important) idsImportant.push(task.id)
    else idsImportant = idsImportant.filter((id: number) => id !== task.id)

    localStorage.setItem('idsImportant', JSON.stringify(idsImportant))
    setIdsImportant(idsImportant)

    if (searchParams[0].get('filter') === 'important') localDeleteTask(id)
  }

  const debounceUpdateNameMutate = useDebounceCallback(updateNameMutate, 300)
  const debounceUpdateDescriptionMutate = useDebounceCallback(updateDescriptionMutate, 300)

  return {
    state: {
      ...task,
      status: task.status === 'completed' ? true : false
    },
    functions: { onComplete, onNameChange, onImportant, onDelete, onDescriptionChange }
  }
}
