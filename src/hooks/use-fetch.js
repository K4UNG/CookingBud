import { useState } from 'react'

export default function useFetch(url) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchData() {
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
    }

    return [fetchData, loading, error]
}