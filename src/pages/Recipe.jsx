import { useParams } from 'react-router-dom'
import RecipeDetail from '../components/Recipe/RecipeDetail'

export default function Recipe() {
    const { id } = useParams()
    return <RecipeDetail id={id} />
}