import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Route, Routes} from "react-router-dom";
import Landing from '../pages/Landing/Landing';
import Signup from '../pages/Signup/Signup';
import Signin from '../pages/Signin/Signin';
import Signout from '../pages/Signout/Signout';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import Orders from '../pages/Orders/Orders';
import Backdoor from '../pages/Backdoor/Backdoor';

function App() {
  return (
    <>
    <Navbar />      
    <Routes>
      <Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />      
        <Route path="/signin" element={<Signin />} />      
        <Route path="/signout" element={<Signout />} />    
        
        <Route path="/shopping-cart" element={<ShoppingCart />} />            
        <Route path="/orders" element={<Orders />} />       
        <Route path="backdoor" element={<Backdoor />}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App