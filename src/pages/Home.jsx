import Nav from "../components/Nav/Nav";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import { useState, useEffect } from "react";
import Popular from "../components/Popular/Popular";
import Cuisine from "../components/Cuisine/Cuisine";
import Slider from "react-slick";

export default function Home() {
  const navigate = useNavigate();

  const [popular, setPopular] = useState([]);
  const [vegan, setVegan] = useState([]);
  const [getPopular, popularLoading, popularError] = useFetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=5`
  );

  const [getVegan, veganLoading, veganError] = useFetch(`https://api.spoonacular.com/recipes/random?number=5&tags=vegetarian&apiKey=${process.env.REACT_APP_API_KEY}`)
  useEffect(() => {
    const ls = localStorage.getItem("popular");
    if (!ls || ls === "undefined") {
      getPopular().then((data) => {
        setPopular(data.recipes);
        localStorage.setItem("popular", JSON.stringify(data.recipes));
      });
    } else {
      setPopular(JSON.parse(ls));
    }

    const ve = localStorage.getItem("vegan");
    if (!ve || ve === "undefined") {
      getVegan().then((data) => {
        setVegan(data.recipes);
        localStorage.setItem("vegan", JSON.stringify(data.recipes));
      });
    } else {
      setVegan(JSON.parse(ve));
    }
  }, [getVegan, getPopular]);

  const [query, setQuery] = useState("");

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
              Pick you ingredients
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.body}>
        <Cuisine />
        <h2 className="heading">Popular picks for you</h2>
        {popularLoading ? (
          <p>Loading...</p>
        ) : popularError ? (
          <p>{popularError}</p>
        ) : (
          <Slider {...{
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000
          }}>
            {popular?.map((item) => {
              return <Popular key={item.id} recipe={item} time={true} />;
            })}
          </Slider>
        )}
        
        <h2 className={`heading ${styles.vegan}`}>Vegan options</h2>
        {veganLoading ? (
          <p>Loading...</p>
        ) : veganError ? (
          <p>{veganError}</p>
        ) : (
          <Slider {...{
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000
          }}>
            {vegan?.map((item) => {
              return <Popular key={item.id} recipe={item} time={true} />;
            })}
          </Slider>
        )}
      </section>
    </div>
  );
}
