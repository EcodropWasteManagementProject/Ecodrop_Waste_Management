import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { reportService } from '../services/reportService'

export default function useCitizenReports() {
  const { token } = useAuth()
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true

    if (!token) {
      return () => {
        active = false
      }
    }

    reportService.getReports(token)
      .then((result) => {
        if (active) {
          setReports(result)
          setError('')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message || 'Reports could not be loaded.')
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [token, reloadKey])

  const reload = useCallback(() => {
    setIsLoading(true)
    setReloadKey((key) => key + 1)
  }, [])
  return { reports, isLoading, error, reload }
}
