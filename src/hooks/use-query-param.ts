import { useLocation } from 'react-router-dom'

export const useQueryParam = (name: string): string | null => {
  const location = useLocation()

  const query = new URLSearchParams(location.search)

  return query.get(name)
}
