import { useState, useEffect, useCallback } from "react";

export default function useMedia(tablet, desktop) {
    const [state, setState] = useState('')
    
    const checkWidth = useCallback(() => {
        const width = window.innerWidth
        if (width > desktop) {
            setState('desktop')
        } else if (width > tablet) {
            setState('tablet')
        } else {
            setState('mobile')
        }
    }, [tablet, desktop]) 

    useEffect(() => {
        checkWidth()
        window.onresize = checkWidth

        return () => {window.removeEventListener('resize', checkWidth)}
    }, [checkWidth])

    return state
}