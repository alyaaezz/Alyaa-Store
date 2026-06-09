import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext'

export default function Carts() {
  let [cartProduct, setProduct] = useState(null)
  let { getProductToCart, deleteProductFromCart, updateProductInCart } = useContext(cartContext)

  async function getProduct() {
    let response = await getProductToCart();
    if (response?.data?.status === "success") {
        setProduct(response.data.data)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  async function deleteProduct(id) {
    let response = await deleteProductFromCart(id);
    setProduct(response.data.data)
  }

  async function updateProduct(Id, count) {
    if (count < 1) return;
    let response = await updateProductInCart(Id, count);
    setProduct(response?.data?.data)
  }

  return (
    <>
      {cartProduct?.products?.length > 0 ? (
        <section className="py-5 bg-light min-vh-100">
          <div className="container">
            <h2 className="fw-bold mb-5 mt-4">Shopping Cart</h2>
            <div className="row g-4">
              
              {/* قائمة المنتجات على اليسار */}
              <div className="col-lg-8">
                {cartProduct.products.map((item) => (
                  <div key={item.product._id} className="card border-0 shadow-sm p-3 mb-3" style={{ borderRadius: '15px' }}>
                    <div className="row align-items-center">
                      {/* صورة المنتج */}
                      <div className="col-md-2 col-4 text-center">
                        <img 
                          src={item.product.imageCover} 
                          className="img-fluid rounded" 
                          alt={item.product.title} 
                          style={{ maxHeight: '100px', objectFit: 'contain' }} 
                        />
                      </div>

                      {/* اسم المنتج وسعره */}
                      <div className="col-md-4 col-8">
                        <h6 className="fw-bold mb-1">{item.product.title.split(' ').slice(0, 3).join(' ')}</h6>
                        <p className="text-main small mb-0">{item.price} EGP</p>
                      </div>

                      {/* التحكم في الكمية */}
                      <div className="col-md-3 col-6 d-flex align-items-center justify-content-md-center mt-3 mt-md-0">
                        <button 
                          onClick={() => updateProduct(item.product._id, item.count - 1)} 
                          className="btn btn-sm btn-outline-danger"
                          style={{ width: '30px', height: '30px', padding: '0' }}
                        >-</button>
                        <span className="mx-3 fw-bold">{item.count}</span>
                        <button 
                          onClick={() => updateProduct(item.product._id, item.count + 1)} 
                          className="btn btn-sm btn-outline-success"
                          style={{ width: '30px', height: '30px', padding: '0' }}
                        >+</button>
                      </div>

                      {/* زر الحذف */}
                      <div className="col-md-3 col-6 text-end mt-3 mt-md-0">
                        <button onClick={() => deleteProduct(item.product._id)} className="btn btn-link text-danger p-0 text-decoration-none">
                          <i className="fas fa-trash-alt me-1"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ملخص الطلب على اليمين */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px', backgroundColor: '#fff', position: 'sticky', top: '100px' }}>
                  <h4 className="fw-bold mb-4">Order Summary</h4>
                  
                  <div className="d-flex justify-content-between mb-3 text-secondary">
                    <span>Subtotal ({cartProduct.products.length} items)</span>
                    <span>{cartProduct.totalCartPrice} EGP</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-secondary">
                    <span>Shipping</span>
                    <span className="badge bg-light text-dark fw-normal p-2" style={{ borderRadius: '10px' }}>Free</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-secondary">
                    <span>Tax</span>
                    <span>0.00 EGP</span> 
                  </div>

                  <hr className="my-4 text-muted" />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">Total</h5>
                    <h5 className="fw-bold mb-0" style={{ color: '#dc3545' }}>
                      {cartProduct.totalCartPrice} EGP
                    </h5>
                  </div>

                  <Link 
                    to={`/checkout/${cartProduct._id}`} 
                    className="btn btn-danger w-100 py-2 fw-bold rounded-pill shadow-sm"
                  >
                    Proceed to Checkout
                  </Link>

                  <div className="mt-4 small text-secondary">
  
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      ) : (
        /* في حال كانت السلة فارغة */
        <div className="py-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
          <i className="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
          <h2 className="fw-bold">Your cart is empty</h2>
          <p className="text-secondary">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn btn-danger rounded-pill px-5 mt-3 shadow-sm">
            Start Shopping
          </Link>
        </div>
      )}
    </>
  );
}