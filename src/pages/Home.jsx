import Nav from "../components/Nav/Nav";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cuisine from "../components/Cuisine/Cuisine";
import RecipeList from "../components/RecipeList/RecipeList";
import useMedia from "../hooks/use-media";

export default function Home() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const state = useMedia(700, 1100)

  function submitHandler(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/search/${query}`);
  }

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <Nav />
        <form className={styles.form} onSubmit={submitHandler}>
          <div>
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search..."
            />
          </div>
        </form>

        <div className={styles.card}>
          <img src="./images/fridge.png" alt="fridge full of ingredients" />
          <div className={styles.card__text}>
            <small>It's easy to get started</small>
            <h1 className="heading">What's in your fridge?</h1>
            <p>
              Start cooking with what you have at home. Thousands of delicious
              recipes are only a click away.
            </p>
            <Link to="/ingredients" className={styles.card__btn}>
              Pick your ingredients
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.body}>
        <Cuisine />
        <h2 className="heading">Popular picks for you</h2>
        <RecipeList 
          state={state}
          LSkey={'popular'}
          url={`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6`}
        />
        
        <h2 className={`heading ${styles.vegan}`}>Vegan options</h2>
        <RecipeList 
          state={state}
          LSkey={'vegan'}
          url={`https://api.spoonacular.com/recipes/random?number=6&tags=vegetarian&apiKey=${process.env.REACT_APP_API_KEY}`}
        />
      </section>
    </div>
  );
}
