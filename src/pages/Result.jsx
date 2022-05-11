import { useLocation } from "react-router-dom"
import Nav from "../components/Nav/Nav"
import useFetch from "../hooks/use-fetch"
import { useState, useEffect } from 'react'
import Results from "../components/Results/Results"

export default function Result() {
    const location = useLocation()
    const {type, cuisine, ingredients} = location.state

    const ingredientParam = ingredients.map(item => item.name).join(',')

    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&includeIngredients=${ingredientParam}`

    if (type) url += '&type=' + type
    if (cuisine) url += '&cuisine=' + cuisine

    const [results, setResults] = useState([])
    const [getRecipes, loading, error] = useFetch(url)

    useEffect(() => {
        (async() => {
            const data = await getRecipes()
            setResults(data.results)
        })()
    }, [])

    return <div className="wrapper">
        <Nav />
        <Results data={results} />
    </div>
}