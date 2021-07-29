import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from "./styles.module.css"


export default function NavMenu() {
  const router = useRouter()

  return (
    <div className={styles.menuWrapper}>
    <nav className={styles.menuNav}>

      <div className={styles.navHeader}>
        <span>HC Dashboard</span>
      </div>

      <Link href="/dashboard" passHref>
        <div className={styles.menuItem + " " + (router.pathname == "/dashboard" ? styles.active : " ")} >
          <div className={styles.menuIcon} 
          style={{ backgroundImage: "url(/home.svg)" }}>
          </div>
          <span>Home</span>
        </div>
      </Link>

      <Link href="/clientes" passHref>
        <div className={styles.menuItem + " " + (router.pathname == "/clientes" ? styles.active : " ")} >
          <div className={styles.menuIcon} 
          style={{ backgroundImage: "url(/contacts.svg)" }}>
          </div>
          <span>Clientes</span>
        </div>
      </Link>
      
      <Link href="/produtos" passHref>
        <div className={styles.menuItem + " " + (router.pathname == "/produtos" ? styles.active : " ")} >
          <div className={styles.menuIcon} 
          style={{ backgroundImage: "url(/box.svg)" }}>
          </div>
          <span>Produtos</span>
        </div>
      </Link>
      
      <Link href="/" passHref>
        <div className={styles.navFooter}>
          <div className={styles.menuItem + " " + (router.pathname == "/" ? styles.active : " ")} >
            <div className={styles.menuIcon} 
            style={{ backgroundImage: "url(/log-out.svg)" }}>
            </div>
            <span>Logout</span>
          </div>
        </div>
      </Link>

    </nav>
  </div>
  )
}