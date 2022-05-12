import Nav from "../components/Nav/Nav";
import styles from "./Ingredients.module.css";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Ingredient from "../components/Ingredient/Ingredient";
import { Link } from "react-router-dom";

const cuisines = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const types = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink",
];

export default function Ingredients() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");

  const getIngredients = useCallback(async () => {
    setLoading(true);
    setError("");
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${process.env.REACT_APP_API_KEY}&query=${search}&number=5&metaInformation=true`
    );
    if (!response.ok) {
      setLoading(false);
      setError("Something went wrong");
      return;
    }
    const data = await response.json();
    setItems(data);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    if (!search) return;
    const timer = setTimeout(() => {
      getIngredients();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search, getIngredients]);

  function removeInge(id) {
    setIngredients((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }

  const [type, setType] = useState("");
  const [cuisine, setCuisine] = useState("");

  return (
    <div className="wrapper">
      <Nav />
      <div className={styles.wrapper}>
        <div className={styles.input}>
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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search for ingredients..."
          />
        </div>
        {search && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={styles.results}
          >
            {loading ? (
              <p className={styles.state}>Loading...</p>
            ) : error ? (
              <p className={styles.state}>Something went wrong</p>
            ) : items.length === 0 && !loading ? (
              <p className={styles.state}>No results found</p>
            ) : (
              items.map((item) => {
                return (
                  <button
                    onClick={() => {
                      setIngredients((prev) => {
                        return [
                          ...prev.filter((inge) => inge.id !== item.id),
                          item,
                        ];
                      });
                      setSearch("");
                    }}
                    key={item.id}
                  >
                    {item.name}
                  </button>
                );
              })
            )}
          </motion.div>
        )}
      </div>

      <h2 className="heading">Ingredients</h2>
      <div className={styles.ingredients}>
        {ingredients.length === 0 ? (
          <p>No ingredients selected.</p>
        ) : (
          ingredients.map((item) => {
            return (
              <Ingredient
                key={item.id}
                item={item}
                onClick={() => {
                  removeInge(item.id);
                }}
              />
            );
          })
        )}
      </div>
      <div className={styles.options}>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="" disabled>
            Meal Type
          </option>
          {types.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select
          value={cuisine}
          onChange={(e) => {
            setCuisine(e.target.value);
          }}
        >
          <option value="" disabled>
            Cuisine
          </option>
          {cuisines.map((cuisine) => {
            return (
              <option key={cuisine} value={cuisine.toLowerCase()}>
                {cuisine}
              </option>
            );
          })}
        </select>
      </div>
      {ingredients.length > 0 && (
        <Link
          className={styles.search}
          to="/result"
          state={{
            cuisine,
            type,
            ingredients,
          }}
        >
          Search
        </Link>
      )}
    </div>
  );
}
