export const checkFilter = (filter: string): filter is Status => {
  if (filter === 'completed' || filter === 'not_completed' || filter === 'all' || filter === 'important')
    return true
  return false
}
