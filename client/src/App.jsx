import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import SearchResults from "./pages/SearchResults"
import Wishlist from "./pages/Wishlist"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PageNotFound from "./pages/PageNotFound"
import Checkout from "./pages/Checkout"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./context/Auth";
import PaymentSuccess from "./pages/PaymentSuccess"

const App = () => {

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route element={<ProtectedRoutesWithNavbar />}>
              <Route path='/' element={<Home />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/products/category/:category' element={<SearchResults />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/payment-success' element={<PaymentSuccess />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

function ProtectedRoutesWithNavbar() {
  return (
    <>
      <Navbar />
      <ProtectedRoutes />
    </>
  );
}

export default App