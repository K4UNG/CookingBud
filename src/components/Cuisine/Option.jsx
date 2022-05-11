import { Link } from "react-router-dom"
import styles from './Option.module.css'

export default function Cuisine({type, img}) {
    return <Link to={`/cuisine/${type.toLowerCase()}`} className={styles.cuisine}>
        <img src={`./images/${img}.svg`} alt={`${type} flag`} />
        <strong>{type}</strong>
    </Link>
}