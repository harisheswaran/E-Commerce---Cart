import './App.css';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import { Details } from './pages/Details';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart } from './pages/Cart';
function App() {
  
  const [cartItems,setCartItem] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer theme='dark' position='top-center'></ToastContainer>
      <Header cartItems={cartItems}></Header>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/search' element={<Home/>}></Route>
          <Route path='/products/:id' element={<Details cartItems={cartItems} setCartItem={setCartItem}/>}></Route>
          <Route path='/cart' element={<Cart cartItems={cartItems} setCartItem={setCartItem}/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
