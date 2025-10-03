import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Route, Routes} from "react-router-dom";
import Landing from '../pages/Landing/Landing';
import Signup from '../pages/Signup/Signup';

function App() {

  return (
    <>
    <Navbar />      
    <Routes>
      <Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />      
      </Route>
    </Routes>
    </>
  )
}

export default App
