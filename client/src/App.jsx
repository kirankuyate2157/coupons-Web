import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Coupons from './pages/Coupons';
import Cart from './pages/Cart';

function App() {

  return (<>
    <Routes>
      <Route path="/" element={<Coupons />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </>
  );
}

export default App;
