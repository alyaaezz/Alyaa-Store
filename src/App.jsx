import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Carts from './components/Carts/Carts'
import Notfound from './components/Notfound/Notfound'
import UserContextProvider from './context/userContext'
import ProductedRoutes from './components/ProductedRoutes/ProductedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './context/cartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './components/Checkout/Checkout' 
import Allorders from './components/Allorders/Allorders'
import Home from './components/Home/Home'

function App() {

  let paths = createBrowserRouter([
    {
      path: '', 
      element: <Layout />, 
      children: [
        {index: true, element: <Home />},
        { path:'products' , element: <Products/> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'brands', element: <ProductedRoutes> <Brands /> </ProductedRoutes> },
        { path: 'carts', element: <ProductedRoutes> <Carts /> </ProductedRoutes> },
        { path: 'productDetails/:id', element: <ProductDetails /> },
        { path: 'checkout/:cartId', element: <ProductedRoutes><Checkout /></ProductedRoutes> },
        { path: 'allorders', element: <ProductedRoutes><Allorders /></ProductedRoutes> },
        { path: '*', element: <Notfound /> },
        { path: 'brand', element: <Brands /> }
       
      ] 
    } 
  ]) 

  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={paths}></RouterProvider>
        <Toaster />
      </UserContextProvider>
    </CartContextProvider>
  )
}

export default App