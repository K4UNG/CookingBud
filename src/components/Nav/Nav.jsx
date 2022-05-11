import styles from './Nav.module.css'
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.svg'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link to='/'><img src={logo} alt="logo" className={styles.logo} /></Link>
      <ul className={styles.nav__links}>
        <li><NavLink className={styles.links} to='/'>HOME</NavLink></li>
        <li><NavLink className={styles.links} to='/ingredients'>INGREDIENTS</NavLink></li>
      </ul>
      <form className={styles.nav__form}>
        <div>
          <input placeholder="Search..." />
        </div>
      </form>
    </nav>
  );
}
