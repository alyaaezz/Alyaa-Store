import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

// استيراد ستايلات Swiper الجاهزة
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './ProductSlider.module.css';

const ProductSlider = ({ data, selectedCategory, setSelectedCategory }) => {
  
  // لو الفئة المختارة مفيهاش منتجات حالياً، بنعرض الفلتر وتحته رسالة تنبيه بدل ما السلايدر يختفي تماماً
  if (!data || data.length === 0) {
    return (
      <div className={styles.sliderContainer}>
        <div className={styles.sliderHeader}>
          <h2>NEW PRODUCTS</h2>
          <div className={styles.categoriesFilter}>
            <span className={selectedCategory === 'All' ? styles.activeTab : ''} onClick={() => setSelectedCategory('All')}>All</span>
            <span className={selectedCategory === 'Clothing' ? styles.activeTab : ''} onClick={() => setSelectedCategory('Clothing')}>Clothing</span>
            <span className={selectedCategory === 'Electronics' ? styles.activeTab : ''} onClick={() => setSelectedCategory('Electronics')}>Electronics</span>
            <span className={selectedCategory === 'Shoes' ? styles.activeTab : ''} onClick={() => setSelectedCategory('Shoes')}>Shoes</span>
          </div>
        </div>
        <p className="text-center text-muted my-5">No products found in this category.</p>
      </div>
    );
  }

  // السلايدر هيعرض كل المنتجات المفلترة بدون قيود أو عدد محدد
  const sliderProducts = data;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderHeader}>
        <h2>NEW PRODUCTS</h2>
        
        {/* أزرار الفلترة والتحكم بالـ Active Tab */}
        <div className={styles.categoriesFilter}>
          <span className={selectedCategory === 'All' ? styles.activeTab : ''} onClick={() => setSelectedCategory('All')}>All</span>
          <span className={selectedCategory === 'Clothing' ? styles.activeTab : ''} onClick={() => setSelectedCategory('Clothing')}>Clothing</span>
          <span className={selectedCategory === 'Electronics' ? styles.activeTab : ''} onClick={() => setSelectedCategory('Electronics')}>Electronics</span>
          <span className={selectedCategory === 'Shoes' ? styles.activeTab : ''} onClick={() => setSelectedCategory('Shoes')}>Shoes</span>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }, // يعرض 3 كروت في الشاشة الكبيرة
        }}
        className={styles.mySwiper}
      >
        {sliderProducts.map((productInfo) => (
          <SwiperSlide key={productInfo.id || productInfo._id} className={styles.slideCard}>
            <Link to={`/productDetails/${productInfo.id}`} className="text-decoration-none text-dark">
              
              <div className={styles.imageWrapper}>
                <img src={productInfo?.imageCover} alt={productInfo?.title} />
              </div>
              
              <h3>
                {productInfo?.title?.split(' ')?.slice(0, 2)?.join(' ') || "Product Name"}
              </h3>
              
              <div className={styles.priceContainer}>
                <span className={styles.price}>{productInfo?.price} EGP</span>
              </div>
              
              <div className={styles.stars}>
                <i className='fas fa-star text-warning me-1'></i>
                <span>{productInfo?.ratingsAverage}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;