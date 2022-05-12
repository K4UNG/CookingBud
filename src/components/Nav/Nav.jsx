import styles from './Nav.module.css'
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.svg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function submitHandler(e) {
    e.preventDefault()
    if (query) {
      navigate('/search/' + query)
    }
  }

  return (
    <nav className={styles.nav}>
      <Link to='/'><img src={logo} alt="logo" className={styles.logo} /></Link>
      <ul className={styles.nav__links}>
        <li><NavLink className={styles.links} to='/'>HOME</NavLink></li>
        <li><NavLink className={styles.links} to='/ingredients'>INGREDIENTS</NavLink></li>
      </ul>
      <form className={styles.nav__form} onSubmit={submitHandler}>
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
          <input value={query} onChange={(e) => {
            setQuery(e.target.value)
          }} placeholder="Search..." />
        </div>
      </form>
    </nav>
  );
}
