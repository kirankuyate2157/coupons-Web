import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Coupons from './pages/Coupons';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';

const NotFound = () => {
  return (<>
    <Navbar />
    <div className="flex font-mono items-center justify-center h-screen  text-black">
      <h1 className="sm:text-2xl">404 | Page Not Found</h1>
    </div>
  </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Coupons />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

