import { Route, Routes } from 'react-router-dom';
import Coupons from './pages/Coupons';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import CreateCoupons from './pages/CreateCoupons';
import axios from 'axios';

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
  axios.defaults.baseURL = "https://kirancoupons.onrender.com";
  axios.defaults.params = {};
  return (
    <>
      <Routes>
        <Route path="/" element={<Coupons />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="createCoupon" element={<CreateCoupons />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

