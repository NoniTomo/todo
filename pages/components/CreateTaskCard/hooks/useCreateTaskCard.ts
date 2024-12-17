import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { usePostTasksMutation } from '@/src/shared/api'
import { useTasksStore } from '@/src/shared/store/todos'

const defaultValues = {
  name: '',
  description: '',
  status: false
}

export const useCreateTaskCard = () => {
  const postTasksMutation = usePostTasksMutation()
  const addTask = useTasksStore.use.addTask()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<{ name: string; description: string; status: boolean }>({
    defaultValues
  })

  const onSubmit: SubmitHandler<{ name: string; description: string; status: boolean }> = async (
    data
  ) => {
    const response = await postTasksMutation.mutateAsync({
      params: {
        data: {
          ...data,
          status: data.status ? 'checked' : 'not_checked'
        }
      }
    })
    addTask({ id: response.data.data.id, ...response.data.data.attributes, important: false })
  }

  return {
    state: { errors, control },
    functions: { onSubmit, handleSubmit }
  }
}
