import { useLocation, useNavigate, useSearchParams as useSearchParamsRouter } from 'react-router-dom'

export const useSearchParams = () => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const searchParams = useSearchParamsRouter()

  const setSearchParams = (params: { key: string; value: string | string[] }[]) => {
    const urlSearchParams = new URLSearchParams(searchParams[0])

    const query = params.reduce((query, param) => {
      if (!param.value.length) {
        urlSearchParams.delete(param.key)

        const search = urlSearchParams.toString()
        return query + search ? `?${search}` : ''
      } else if (!Array.isArray(param.value)) {
        urlSearchParams.set(param.key, param.value)

        const search = urlSearchParams.toString()
        return query + search ? `?${search}` : ''
      }

      return ''
    }, `${pathname}`)

    navigate(query)
  }

  return { searchParams, setSearchParams }
}
