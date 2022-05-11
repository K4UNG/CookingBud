import styles from "./Popular.module.css";
import { Link } from "react-router-dom";

export default function Popular ({ recipe, time }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className={styles.card}>
      <img src={recipe.image} alt={recipe.title} />
      <div className={styles.tags}>
        <h3>{recipe.title}</h3>
        {time && <small>{recipe.readyInMinutes}mins</small>}
      </div>
    </Link>
  );
}
