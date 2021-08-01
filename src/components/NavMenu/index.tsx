import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from "./styles.module.css"


export default function NavMenu() {
  const router = useRouter()

  function handleLogout() {
    localStorage.setItem('currentUser', null )
    router.push('/')
  }

  return (
    <div className={styles.menuWrapper}>
    <nav className={styles.menuNav}>

      <div className={styles.navHeader}>
        <span>HC Dashboard</span>
      </div>

      <Link href="/dashboard" passHref>
        <div className={styles.menuItem + " " + (router.pathname == "/dashboard" ? styles.active : " ")} >
          <div 
          className={styles.menuIcon} 
          style={{ backgroundImage: "url(/home.svg)" }}>
          </div>
          <span>Home</span>
        </div>
      </Link>

      <Link href="/dashboard/clientes" passHref>
        <div className={styles.menuItem + " " + (router.pathname == "/dashboard/clientes" ? styles.active : " ")} >
          <div 
          className={styles.menuIcon} 
          style={{ backgroundImage: "url(/contacts.svg)" }}>
          </div>
          <span>Clientes</span>
        </div>
      </Link>
      
      <Link href="/dashboard/produtos" passHref>
        <div className={styles.menuItem + " " + (router.pathname == "/dashboard/produtos" ? styles.active : " ")} >
          <div 
          className={styles.menuIcon} 
          style={{ backgroundImage: "url(/box.svg)" }}>
          </div>
          <span>Produtos</span>
        </div>
      </Link>
      
      <div className={styles.navFooter} onClick={handleLogout}>
        <div className={styles.menuItem + " " + (router.pathname == "/" ? styles.active : " ")} >
          <div 
          className={styles.menuIcon} 
          style={{ backgroundImage: "url(/log-out.svg)" }}>
          </div>
          <span>Logout</span>
        </div>
      </div>

    </nav>
  </div>
  )
}