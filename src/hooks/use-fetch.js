import { useState, useCallback } from 'react'

export default function useFetch(url) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = useCallback(async () => {
        setError('')
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) {
            setError('something went wrong!')
            setLoading(false)
        }
        const data = await response.json()
        setLoading(false)
        return data
    }, [url])

    return [fetchData, loading, error]
}