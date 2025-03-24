import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home'
import ProductDetail from "../pages/ProductDetail"
import Cart from "../pages/Cart"
import SearchResults from "../pages/SearchResults"
import Wishlist from "../pages/Wishlist"
import Checkout from "../pages/Checkout";

import { useAuth } from "../context/Auth"
import PaymentSuccess from "../pages/PaymentSuccess";

const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/products/category/:category' element={<SearchResults />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
        </Routes>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoutes;
