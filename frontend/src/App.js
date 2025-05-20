import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/everyday" element={<ShopCategory banner={everyday_banner} category="everyday" />} />
          <Route path="/toiletries" element={<ShopCategory banner={toiletries_banner} category="toiletries" />} />
          <Route path="/greendevices" element={<ShopCategory banner={greendevices_banner} category="greendevices" />} />
          <Route path="/niche" element={<ShopCategory banner={niche_banner} category="niche" />} />
          <Route path="/furniture" element={<ShopCategory banner={furniture_banner} category="furniture" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
