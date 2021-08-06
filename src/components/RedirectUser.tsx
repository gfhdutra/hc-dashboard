import styled, { keyframes } from "styled-components"


export default function RedirectUser() {
  return (
    <Container>
      <Main>
        <Title>Redirecionando...</Title>
        <Preloader>
          <Loader />
        </Preloader>
      </Main>
    </Container>
  )
}


const spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
`
const Main = styled.main`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f7f8fc;
`
const Title = styled.h1`
  margin: 1rem 0; 
  line-height: 1;
  font-size: 3rem;
  font-weight: 100;
`
const Preloader = styled.div`
  margin: 2rem;
  width: 100px;
  height: 100px;
`
const Loader = styled.div`
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 100px;
  height: 100px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #9370DB;
  -webkit-animation: ${spin} 2s linear infinite;
  animation: ${spin} 2s linear infinite;

  &:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #BA55D3;
    -webkit-animation: ${spin} 3s linear infinite;
    animation: ${spin} 3s linear infinite;
  }

  &:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #FF00FF;
    -webkit-animation: ${spin} 1.5s linear infinite;
    animation: ${spin} 1.5s linear infinite;
  }
`
