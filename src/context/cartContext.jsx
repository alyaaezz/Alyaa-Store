import axios from "axios";
import { createContext, useState, useEffect } from "react"; // إضافة useEffect

export let cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  // دالة جلب البيانات الأساسية
  async function getProductToCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setCartItems(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        setCartId(response.data.cartId);
        return response;
      })
      .catch((error) => error);
  }

  // جلب البيانات تلقائياً عند فتح الموقع لضمان ظهور الرقم في الـ Navbar
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getProductToCart();
    }
  }, []);

  // إضافة منتج
  function addProductToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
      .then((response) => {
        setCartItems(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        setCartId(response.data.cartId);
        return response;
      })
      .catch((error) => error);
  }

  // حذف منتج
  function deleteProductFromCart(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
      .then((response) => {
        setCartItems(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((error) => error);
  }

  // تحديث الكمية
  function updateProductInCart(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers })
      .then((response) => {
        setCartItems(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((error) => error);
  }

  function checkout(shippingAddress) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      { shippingAddress },
      { headers }
    );
  }
function onlinePayment(cartId, shippingAddress) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      { shippingAddress },
      { 
        headers: { 
          token: localStorage.getItem('userToken') 
        } 
      }
    )
    .then((res) => res)
    .catch((err) => err);
  }
  // حساب عدد المنتجات بناءً على المصفوفة المحدثة دائماً
  let cartCount = cartItems?.length || 0;

  return (
    <cartContext.Provider value={{
      addProductToCart,
      getProductToCart,
      deleteProductFromCart,
      updateProductInCart,
      checkout,
      onlinePayment,
      cartItems,
      totalPrice,
      cartCount // تمرير العداد للـ Navbar
    }}>
      {props.children}
    </cartContext.Provider>
  );
}