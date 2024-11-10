import { createBrowserRouter } from "react-router-dom";
import Root from '../Root.jsx';
import Home from '../components/user/home/Home.jsx';
import Products from '../pages/user/products/Products.jsx';
import Categories from '../pages/user/categories/Categories.jsx';
import Login from "../pages/user/login/Login.jsx";
import Register from "../pages/user/Register/Register.jsx";
import CategoryDetails from "../pages/user/catrgoryDetails/CategoryDetails.jsx";
import Product from "../pages/user/product/Product.jsx";
import Cart from "../pages/user/cart/Cart.jsx";
import Checkout from "../pages/user/checkout/Checkout.jsx";
import Profile from "../pages/user/profile/Profile.jsx";
import Info from "../pages/user/profile/info/Info.jsx";
import Contact from "../pages/user/profile/contact/Contact.jsx";
import OrdersDetails from "../pages/user/profile/ordersDetails/OrdersDetails.jsx";
import UserContextProvider from '../pages/user/login/context/User.jsx';


const createAppRouter = (isLogin, userData, setIsLogin, setUserData) => 
  createBrowserRouter([
    {
      path: '/',
      element: (
        <Root
          isLogin={isLogin}
          userData={userData}
          setIsLogin={setIsLogin}
          setUserData={setUserData}
        />
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/products', element: <Products /> },
        { path: '/categories', element: <Categories /> },
        {
          path: '/register',
          element: (
            <UserContextProvider>
              <Register />
            </UserContextProvider>
          ),
        },
        {
          path: '/login',
          element: (
            <UserContextProvider>
              <Login setIsLogin={setIsLogin} setUserData={setUserData} />
            </UserContextProvider>
          ),
        },
        { path: '/categoryDetails/:categoryId', element: <CategoryDetails /> },
        { path: '/product/:productId', element: <Product /> },
        { path: '/cart', element: <Cart /> },
        {path:'/checkout', element:<Checkout />},
        {path:'profile', element:<Profile />,
          children:[
            { path: 'info', element: <Info /> }, 
            { path: 'contact', element: <Contact /> }, 
            { path: 'ordersDetails', element: <OrdersDetails /> },
            { path: '', element: <Info /> }, 


          ]


          
        }
      ],
    },
  ]);

export default createAppRouter;
