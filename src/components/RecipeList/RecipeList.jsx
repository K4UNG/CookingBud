import { useEffect, useState } from "react";
import Slider from "react-slick";
import useFetch from "../../hooks/use-fetch";
import Popular from "../Popular/Popular";

export default function RecipeList({ url, LSkey, state }) {
  const [getItems, loading, error] = useFetch(url);
  const [items, setItems] = useState([]);

  function setLSTimer() {
    const timer = new Date()
    const time = `${timer.getFullYear()} ${timer.getMonth() + 1} ${timer.getDate()} ${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`
    localStorage.setItem('timer', time)
  }

  useEffect(() => {
    let timer = localStorage.getItem('timer')
    if (!timer) {
      setLSTimer()
    }
    timer = new Date(localStorage.getItem('timer'))
    const now = new Date()

    const timeDiff = Math.round((now - timer) / 1000)

    const ls = localStorage.getItem(LSkey);
    if (!ls || ls === "undefined" || timeDiff > 43200) {
      getItems().then((data) => {
        setItems(data.recipes);
        localStorage.setItem(LSkey, JSON.stringify(data.recipes));
        setLSTimer()
      });
    } else {
      setItems(JSON.parse(ls));
    }
  }, [getItems, LSkey]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Slider
          {...{
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: state === 'mobile' ? 1 : state === 'tablet' ? 2 : 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
          }}
        >
          {items?.map((item) => {
            return <Popular key={item.id} recipe={item} time={true} />;
          })}
        </Slider>
      )}
    </>
  );
}
