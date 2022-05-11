import { useState } from 'react'

export default function useLocatStorage(key, def) {
    function getLS() {
        const data = localStorage.getItem(key)
        if (data)
            return data
        else
            return def
    }
    function setLS(value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    return [getLS, setLS]
}