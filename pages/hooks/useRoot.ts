import React from 'react'

import { useSearchParams } from '@/src/shared/hooks'

import { checkFilter } from '../helpers'

export const useRoot = () => {
  const { searchParams, setSearchParams } = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  const [filter, setFilter] = React.useState(searchParams[0].get('filter') ?? '')

  React.useEffect(() => {
    if (!checkFilter(filter))
      startTransition(() => {
        setFilter('all')
        setSearchParams([{ key: 'filter', value: 'all' }])
      })
  }, [searchParams])

  const handleChange = (value: string) => {
    startTransition(() => {
      setFilter(value)
      setSearchParams([{ key: 'filter', value: value }])
    })
  }

  return {
    state: {
      isPending,
      filter,
      searchParams,
      value: checkFilter(filter) ? filter : 'all',
      isImportant: searchParams[0].get('filter') === 'important'
    },
    functions: { handleChange, setSearchParams, startTransition, setFilter }
  }
}
