import styles from "./RecipeDetail.module.css";
import Nav from "../Nav/Nav";
import useFetch from "../../hooks/use-fetch";
import { useEffect, useState } from "react";
import placeholder from './placeholder.png'

export default function RecipeDetail({ id }) {
  const [detail, setDetail] = useState();

  const [getInfo, loading, error] = useFetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
  );

  useEffect(() => {
    (async () => {
      const data = await getInfo();
      setDetail(data);
    })();
  }, [getInfo]);
  let content;
  if (loading) {
    content = <p className={styles.error}>Loading...</p>;
  } else {
    content = (
      <>
        <h1 className="heading">{detail?.title}</h1>
        <div className={styles.img}><img src={detail?.image ? detail.image : placeholder} alt={detail?.title} /></div>

        <strong>Ready in: {detail?.readyInMinutes}mins</strong>
        <strong>Servings: {detail?.servings}</strong>
        <h2 className="heading">Ingredients</h2>
        <ul>
          {detail?.extendedIngredients.map((item) => {
            return <li key={item.original}>{item.original}</li>;
          })}
        </ul>
        <h2 className="heading">Instructions</h2>
        {detail?.instructions ? (
          <p
            dangerouslySetInnerHTML={{ __html: detail?.instructions }}
            className={styles.instructions}
          />
        ) : (
          <p className={styles.instructions}>No instructions</p>
        )}

        <h2 className="heading">Summary</h2>
        <p dangerouslySetInnerHTML={{ __html: detail?.summary }} />
      </>
    );
  }
  if (error) {
    content = <h1>{error}</h1>;
  }

  return (
    <div className={`${styles.recipe} wrapper`}>
      <Nav />
      <div className={styles.detail}>{content}</div>
    </div>
  );
}
