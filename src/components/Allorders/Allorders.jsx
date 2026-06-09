import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../../context/userContext'; // للتأكد من وجود الـ Token أو بيانات المستخدم

export default function Allorder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ملحوظة: الـ API الخاص بـ Route بيحتاج يقرأ الـ User ID من الـ Token أو يتبعت له الـ ID
  // غالباً الـ API ده بيرجع كل الطلبات لو بعتنا الـ User ID
  
  async function getAllOrders() {
    try {
      // هنا بنحاول نجيب الـ ID بتاع المستخدم (ممكن تجيبيه من الـ Token المفكوك)
      // لو مش معاكي الـ ID، الـ API ده غالباً بيكون:
      // https://ecommerce.routemisr.com/api/v1/orders/user/[USER_ID]
      
      // كحل مؤقت لعرض الشكل، هنفترض إن الـ API بيرجع بياناتك
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
      setOrders(data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching orders:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center"><i className="fas fa-spinner fa-spin fa-3x text-main"></i></div>;

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <h2 className="fw-bold mb-5 mt-4 text-center">Your Orders History</h2>
        
        {orders.length > 0 ? (
          <div className="row g-4">
            {orders.map((order) => (
              <div key={order._id} className="col-12">
                <div className="card border-0 shadow-sm p-4 mb-3" style={{ borderRadius: '15px' }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <span className="badge bg-success p-2 mb-2">Order ID: #{order._id.slice(-5)}</span>
                      <p className="text-secondary small mb-0">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-end">
                      <h5 className="fw-bold text-main mb-0">{order.totalOrderPrice} EGP</h5>
                      <span className="text-muted small">{order.paymentMethodType}</span>
                    </div>
                  </div>

                  <hr />

                  <div className="row mt-3">
                    {order.cartItems.map((item) => (
                      <div key={item._id} className="col-md-6 mb-3">
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.product.imageCover} 
                            alt={item.product.title} 
                            className="rounded" 
                            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                          />
                          <div className="ms-3">
                            <h6 className="fw-bold mb-1">{item.product.title.split(' ').slice(0, 2).join(' ')}</h6>
                            <p className="mb-0 small text-secondary">Count: {item.count}</p>
                            <p className="mb-0 small text-main">Price: {item.price} EGP</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="fas fa-box-open fa-4x text-muted mb-3"></i>
            <h3>No orders found yet.</h3>
          </div>
        )}
      </div>
    </section>
  );
}