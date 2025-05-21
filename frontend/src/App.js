import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import ThankYou from './Pages/ThankYou';
import Footer from './Components/Footer/Footer';
import { ShopCategory } from './Pages/ShopCategory'
import everyday_banner from './Components/Assets/banner_everyday.png';
import toiletries_banner from './Components/Assets/banner_toiletries.png';
import greendevices_banner from './Components/Assets/banner_greendevices.png';
import niche_banner from './Components/Assets/banner_niche.png';
import furniture_banner from './Components/Assets/banner_furniture.png';

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/everyday" element={<ShopCategory banner={everyday_banner} category="EveryDay" />} />
          <Route path="/toiletries" element={<ShopCategory banner={toiletries_banner} category="Toiletries" />} />
          <Route path="/greendevices" element={<ShopCategory banner={greendevices_banner} category="Greendevices" />} />
          <Route path="/niche" element={<ShopCategory banner={niche_banner} category="Niche" />} />
          <Route path="/furniture" element={<ShopCategory banner={furniture_banner} category="Furniture" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
