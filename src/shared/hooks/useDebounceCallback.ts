import { useMemo } from 'react'

import { debounce } from './helpers/debounce'
import { useEvent } from './useEvent'

export const useDebounceCallback = <Params extends unknown[], Return>(
  callback: (...args: Params) => Return,
  delay: number
) => {
  const internalCallback = useEvent(callback)
  const debounced = useMemo(() => debounce(internalCallback, delay), [delay])

  return debounced
}
