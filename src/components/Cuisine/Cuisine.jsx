import styles from "./Cuisine.module.css";
import Option from "./Option";

export default function Cuisine() {
  return (
    <>
      <h2 className={`heading ${styles.filter}`}>Filter by cuisine</h2>
      <div className={styles.cuisine}>
        <Option type="American" img="usa" />
        <Option type="Korean" img="korea" />
        <Option type="Japanese" img="japan" />
        <Option type="Spanish" img="spanish" />
        <Option type="Italian" img="italy" />
      </div>
    </>
  );
}
