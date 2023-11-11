import { Route, Routes } from 'react-router-dom';
import Coupons from './pages/Coupons';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import CreateCoupons from './pages/CreateCoupons';
import axios from 'axios';
import { DataProvider } from './context/DataProvider';
import { useState, useEffect } from 'react';
import PersonalInfo from './components/PersonalInfo';

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
  const [couponsData, setCouponsData] = useState([]);
  axios.defaults.baseURL = "https://kirancoupons.onrender.com";
  axios.defaults.params = {};

  useEffect(() => {
    axios.get('/kkcoupon/api/v1/coupons/getall')
      .then((response) => {
        const coupons = response.data;
        const currentDate = new Date();
        const sortedCoupons = coupons.map(coupon => {
          // Calculate the date difference in milliseconds
          const dateDifference = new Date(coupon.expirationDate) - currentDate;
          // Add the dateDifference as a new property to the coupon object
          return { ...coupon, dateDifference };
        });
        // Sort the coupons by dateDifference in ascending order
        const sortedByData = sortedCoupons.sort((a, b) => a.dateDifference - b.dateDifference);
        setCouponsData(sortedByData)
      })
      .catch((error) => {
        console.error('Error fetching coupons: ', error);
      });


  }, []);
  return (
    <>
      <DataProvider data={couponsData}>
        <Routes>
          <Route path="/" element={<Coupons />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/info" element={<PersonalInfo />} />

          <Route path="createCoupon" element={<CreateCoupons />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DataProvider>
    </>
  );
}

export default App;

