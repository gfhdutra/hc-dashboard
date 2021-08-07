import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'

type Route = {
  route: string,
  currentRoute: string,
}

export default function NavMenu() {
  const router = useRouter()
  let currentRoute = router.pathname

  function handleLogout() {
    localStorage.setItem('currentUser', null)
    router.push('/')
  }

  return (
    <MenuWrapper>
      <MenuNav>

        <NavHeader>
          <span>HC Dashboard</span>
        </NavHeader>

        <Link href="/dashboard" passHref>
          <MenuItem route="/dashboard" currentRoute={currentRoute}>
            <MenuIcon style={{ backgroundImage: "url(/home.svg)" }}></MenuIcon>
            <span>Home</span>
          </MenuItem>
        </Link>

        <Link href="/dashboard/clientes" passHref>
          <MenuItem route="/dashboard/clientes" currentRoute={currentRoute}>
            <MenuIcon style={{ backgroundImage: "url(/contacts.svg)" }}></MenuIcon>
            <span>Clientes</span>
          </MenuItem>
        </Link>

        <Link href="/dashboard/produtos" passHref>
          <MenuItem route="/dashboard/produtos" currentRoute={currentRoute}>
            <MenuIcon style={{ backgroundImage: "url(/box.svg)" }}></MenuIcon>
            <span>Produtos</span>
          </MenuItem>
        </Link>

        <NavFooter onClick={handleLogout}>
          <MenuItem route="/" currentRoute={currentRoute}>
            <MenuIcon style={{ backgroundImage: "url(/log-out.svg)" }}></MenuIcon>
            <span>Logout</span>
          </MenuItem>
        </NavFooter>

      </MenuNav>
    </MenuWrapper>
  )
}


const MenuWrapper = styled.div`
  width: 16rem;
  display: flex;
  flex-direction: column;
  color: #A4A6B3;
  background-color: #363740;

  @media (max-width: 600px) {
    width: 4.5rem;
  }
`
const MenuNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
const NavHeader = styled.div`
  width: 16rem;
  height: 3.5rem;
  margin-top: 1.1rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.1875rem;
  font-weight: 500;
  color: #838590;

  span {
    margin-left: 3.5rem;
  }
  @media (max-width: 600px) {
    visibility: hidden;
  }
`
const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translateY(1.5px);
  filter: invert(39%) sepia(28%) saturate(154%) hue-rotate(194deg) brightness(93%) contrast(96%);
`
const MenuItem = styled.div`
  ${(props: Route) => props.route == props.currentRoute && {
  color: '#DD22F', 
  backgroundColor: '#3f4049', 
  borderLeft: '3px solid #DDE2FF'}} 
  width: 16rem;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    color: #DDE2FF;
    background-color: #3f4049;
    ${MenuIcon} {
      filter: invert(99%) sepia(25%) saturate(5568%) hue-rotate(179deg) brightness(101%) contrast(105%);
    }
  }
  ${MenuIcon} {
    margin-left: ${(props: Route) => props.route == props.currentRoute ? 'calc(1.5rem - 3px)' : '1.5rem'};
    filter: ${(props: Route) => props.route == props.currentRoute ? 'invert(99%) sepia(25%) saturate(5568%) hue-rotate(179deg) brightness(101%) contrast(105%);' : 'invert(39%) sepia(28%) saturate(154%) hue-rotate(194deg) brightness(93%) contrast(96%)'};
  }
  @media (max-width: 600px) {
    width: 4.5rem;
    span {
      display: none;
    }
  }
`
const NavFooter = styled.div`
  margin-top: auto;
  margin-bottom: 3rem;
`
