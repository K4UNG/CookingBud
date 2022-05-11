import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import { useEffect, useState } from "react";
import Results from "../components/Results/Results";
import Nav from "../components/Nav/Nav";

export default function Sarch() {
  const [results, setResults] = useState([]);
  const { query } = useParams();
  const [getData, loading, error] = useFetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}`
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
      <h3 className='heading title'>Search results for <span>"{query}"</span></h3>
      <Results data={results} loading={loading} error={error} />
      </div>
    </>
  );
}