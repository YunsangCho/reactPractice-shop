import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';

function App() {

  //서버에서 가져온 데이터라고 생각
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();


  

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
        <div className="main-bg"></div>
        <div className="container">
          <div className="row">
            {
              shoes.map((a, i) => {
                return(
                  <Card shoes={a} i={i}></Card>
                )
              })
            }
          </div>
        </div>
        <button onClick={()=>{
          axios.get("https://codingapple1.github.io/shop/data2.json")
          .then((result)=>{
            var returnData = result.data;
            var tmp = [...shoes, ...returnData];
            setShoes(tmp);
          })
          .catch((error) => {
            console.log(error);
          })
        }}>더보기</button>
        </>
        }
        />
        <Route path="/detail" element={<Detail shoes={shoes}/>}/>
        <Route path="*" element={
          <>
          <div>404 페이지 존재 Ⅹ </div>
          </>
        }/>

        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>위치정보임</div>}/>
        </Route>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>

        <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>

      </Routes>

    </div>
  )
}

function Event(){
  return(
    <div >
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){

  return(
    <div class="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.i+1) + ".jpg"} width="80%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )

}


export default App;
