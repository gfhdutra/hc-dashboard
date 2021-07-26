import Link from 'next/link'
import styles from "./styles.module.css"


export default function NavMenu() {
  return (
    <div className={styles.menuWrapper}>
    <nav className={styles.menuNav}>

      <div className={styles.navHeader}>
        <div className={styles.menuItem}>
          <div className={styles.menuIcon}>
            <Link href="/dashboard" passHref>
              <div className={styles.smileImg}></div>
            </Link>
          </div>
          <Link href="/dashboard" passHref>
            <span>Meu Perfil</span>
          </Link>
        </div>
      </div>

      <div className={styles.menuItem}>
        <div className={styles.menuIcon}>
          <Link href="/client" passHref>
            <div className={styles.userImg}></div>
          </Link>
        </div>
        <Link href="/client" passHref>
          <span>Clientes</span>
        </Link>
      </div>

      <div className={styles.menuItem}>
        <div className={styles.menuIcon}>
          <Link href="/product" passHref>
            <div className={styles.productImg}></div>
          </Link>
        </div>
        <Link href="/product" passHref>
          <span>Produtos</span>
        </Link>
      </div>

    <div className={styles.navFooter}>
      <div className={styles.menuItem}>
        <div className={styles.menuIcon}>
          <Link href="/" passHref>
            <div className={styles.logoutImg}></div>
          </Link>
        </div>
        <Link href="/" passHref>
          <span>Logout</span>
        </Link>
      </div>
    </div>

    </nav>
  </div>
  )
}