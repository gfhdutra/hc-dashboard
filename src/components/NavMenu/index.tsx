import Link from 'next/link'
import Image from 'next/image'
import Smile from '/public/smile.svg'
import User from '/public/user.svg'
import Box from '/public/box.svg'
import Logout from '/public/log-out.svg'
import styles from "./styles.module.css"


export default function NavMenu() {
  return (
    <div className={styles.menuWrapper}>
    <nav className={styles.menuNav}>

      <div className={styles.navHeader}>
        <div className={styles.menuItem}>
          <div className={styles.menuIcon}>
            <Link href="/dashboard" passHref>
              <Image src={Smile} alt=""></Image>
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
            <Image src={User} alt=""></Image>
          </Link>
        </div>
        <Link href="/client" passHref>
          <span>Clientes</span>
        </Link>
      </div>

      <div className={styles.menuItem}>
        <div className={styles.menuIcon}>
          <Link href="/product" passHref>
            <Image src={Box} alt=""></Image>
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
            <Image src={Logout} alt=""></Image>
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