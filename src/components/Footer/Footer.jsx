import styles from './Footer.module.css'

export default function Footer() {
    return <footer className={styles.footer}>
        <img src='./images/logo.svg' alt='logo' />
        <p>Created by Kaung Zin Hein</p>
        <p>Email: <a href='mailto:kgzinhein.my@gmail.com'>kgzinhein.my@gmail.com</a></p>
    </footer>
}