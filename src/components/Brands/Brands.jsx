import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. دالة بتجيب الماركات من الـ API
  async function getBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data); // بنخزن الـ array اللي راجع في الـ state
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching brands", error);
      setIsLoading(false);
    }
  }

  // 2. بنشغل الدالة أول ما الصفحة تفتح
  useEffect(() => {
    getBrands();
  }, []);

  // 3. شكل الصفحة وهي بتحمل
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-main" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 4. عرض البيانات لما ترجع تمام
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-main fw-bold">All Brands</h2>
      
      <div className="row g-4">
        {brands.map((brand) => (
          <div key={brand._id} className="col-md-3 col-sm-6">
            
            {/* الكارت اللي فيه الصورة والاسم */}
            <div className="card h-100 text-center border-1 shadow-sm p-3 brand-card" style={{ cursor: 'pointer', transition: 'all 0.3s' }}>
              
              <div className="d-flex align-items-center justify-content-center" style={{ height: '150px' }}>
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="img-fluid h-100" 
                  style={{ objectFit: 'contain' }}
                />
              </div>
              
              <div className="card-body p-2 border-top mt-3">
                <p className="card-text text-muted small mb-0">{brand.name}</p>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
