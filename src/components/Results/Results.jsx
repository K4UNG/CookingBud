import Popular from "../Popular/Popular";

export default function Results({ data, loading, error }) {
  let content = <p>loading...</p>;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (data.length === 0) {
    content = <p>No results found.</p>;
  } else {
    content = (
      <div className="results">
        {data.map((item) => {
          return <Popular key={item.id} recipe={item} />;
        })}
      </div>
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }
  return <>{content}</>;
}
