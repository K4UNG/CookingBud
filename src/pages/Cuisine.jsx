import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import { useEffect, useState } from "react";
import Results from "../components/Results/Results";
import Nav from "../components/Nav/Nav";

export default function Cuisine() {
  const [results, setResults] = useState([]);
  const { cuisine } = useParams();
  const [getData, loading, error] = useFetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${cuisine}`
  );
  useEffect(() => {
    (async () => {
      const data = await getData();
      setResults(data.results);
    })();
  }, [getData]);
  return (
    <>
      <div className="wrapper">
      <Nav />
      <h2 className='heading title'>{cuisine[0].toUpperCase() + cuisine.slice(1)} foods</h2>
        <Results loading={loading} error={error} data={results} />
      </div>
    </>
  );
}
