import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import found from '../../assets/images/logoooo.png'; // الصورة بتاعتك

const Home = () => {
  const navigate = useNavigate(); 
  return (
    <div className={styles.homeContainer}>
      
      {/* البانر الرئيسي اللي هياخد العرض الكامل */}
      <section className={styles.heroFullWidth}>
        {/* الصورة نفسها */}
        <img src={found} alt="Main Banner" className={styles.bannerImg} />
        
        {/* الكلام والزرار فوق الصورة */}
        <div className={styles.heroOverlayContent}>
          <span className={styles.subtitle}>WEEKEND SALE</span>
          <h1 className={styles.title}>Premium Quality <br /> Modern Collection</h1>
          <p className={styles.description}>
            Discover our exclusive new arrivals with up to 50% OFF. Free shipping on orders over $99.
          </p>
          <button className={styles.shopBtn} onClick={() => navigate('/products')}>
            Shop Now ➔
          </button>
        </div>
      </section>

      {/* شريطة المميزات الحمراء */}
      <section className={styles.featuresBar}>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>🚚</span>
          <div>
            <h3>Free Shipping</h3>
            <p>On all orders over $99</p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>🛡️</span>
          <div>
            <h3>Money Back Guarantee</h3>
            <p>30 Days Money Back Guarantee</p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>💳</span>
          <div>
            <h3>Secure Payment</h3>
            <p>100% Protected transactions</p>
          </div>
        </div>
      </section>

      {/* شيلنا سكشن المنتجات تماماً عشان صفحة الهوم تبقى مستقلة */}

    </div>
  );
};

export default Home;