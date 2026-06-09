import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';

export default function Checkout() {
    let { cartId } = useParams(); // الحصول على id السلة من الرابط
    let { onlinePayment } = useContext(cartContext);
    let [isLoading, setIsLoading] = useState(false);

async function handleCheckout(values) {
  setIsLoading(true);
  try {
    let response = await onlinePayment(cartId, values);
    
    console.log("Response from context:", response); // 👈 السطر ده هيطبعلك في الـ Console السيرفر رجع إيه بالظبط

    if (response?.data?.status === "success") {
      window.location.href = response.data.session.url;
    } else {
      setIsLoading(false); // لو مفيش سَكسيس يفصل التحميل
    }
  } catch (error) {
    console.log("Error in checkout:", error); // 👈 السطر ده هيطبعلك الإيرور لو الـ API رفض الطلب
    setIsLoading(false); // يفصل التحميل عشان الزرار ميفضلش يلف
  }
}

    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: handleCheckout
    });

    return (
        <section className="py-5 bg-light min-vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                            <div className="text-center mb-4">
                                <i className="fas fa-credit-card fa-3x text-danger mb-3"></i>
                                <h2 className="fw-bold">Shipping Address</h2>
                                <p className="text-secondary">Please enter your delivery details to proceed</p>
                            </div>

                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="details" className="form-label small fw-bold">Address Details</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-0 bg-light"
                                        id="details"
                                        name="details"
                                        placeholder="e.g. Street name, Building number"
                                        value={formik.values.details}
                                        onChange={formik.handleChange}
                                        style={{ borderRadius: '10px', fontSize: '0.9rem' }}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label small fw-bold">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg border-0 bg-light"
                                        id="phone"
                                        name="phone"
                                        placeholder="e.g. 01012345678"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        style={{ borderRadius: '10px', fontSize: '0.9rem' }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="city" className="form-label small fw-bold">City</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-0 bg-light"
                                        id="city"
                                        name="city"
                                        placeholder="e.g. Cairo"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        style={{ borderRadius: '10px', fontSize: '0.9rem' }}
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-danger w-100 py-3 fw-bold rounded-pill shadow-sm"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : (
                                        "Pay Now"
                                    )}
                                </button>
                            </form>
                            
                            <div className="mt-4 text-center">
                                <p className="small text-secondary mb-0">
                                    <i className="fas fa-lock me-1"></i> Your payment is secure and encrypted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}