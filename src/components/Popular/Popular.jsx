import styles from "./Popular.module.css";
import { Link } from "react-router-dom";

export default function Popular({ recipe, time }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className={styles.card}>
      <img src={recipe.image} alt={recipe.title} />
      <div className={styles.tags}>
        <h3>{recipe.title}</h3>
        {time && (
          <small>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {recipe.readyInMinutes}mins
          </small>
        )}
      </div>
    </Link>
  );
}
