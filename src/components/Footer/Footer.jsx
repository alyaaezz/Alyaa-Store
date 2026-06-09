import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerMain}>
      <div className="container py-5">
        <div className="row g-4">
          
          {/* العمود الأول: نبذة عن الموقع */}
          <div className="col-md-4">
            <h5 className={styles.footerTitle}>ABOUT US</h5>
            <p className={styles.footerText}>
              Welcome to our premium A L Y A A store. We offer the best quality products ranging from fashion items to electronics, ensuring an exceptional shopping experience.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Youtube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="col-md-4 ps-md-5">
            <h5 className={styles.footerTitle}>QUICK LINKS</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className={styles.footerLink}>Home</Link></li>
              <li className="mb-2"><Link to="/products" className={styles.footerLink}>Products</Link></li>
              <li className="mb-2"><Link to="/brands" className={styles.footerLink}>Brands</Link></li>
              <li className="mb-2"><Link to="/carts" className={styles.footerLink}>Carts</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: التواصل والدعم */}
          <div className="col-md-4">
            <h5 className={styles.footerTitle}>CONTACT INFO</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2 d-flex align-items-center">
                <i className="fas fa-map-marker-alt me-2 text-dark"></i> Egypt, Cairo
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="fas fa-phone-alt me-2 text-dark"></i> +20 123 456 789
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="fas fa-envelope me-2 text-dark"></i> support@alyaastore.com
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* شريط الحقوق السفلي */}
      <div className={styles.copyrightBar}>
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <p className="mb-0">© {new Date().getFullYear()} Alyaa Store. All Rights Reserved.</p>
          <div className={styles.paymentMethods}>
            <i className="fab fa-cc-visa mx-1 fs-4"></i>
            <i className="fab fa-cc-mastercard mx-1 fs-4"></i>
            <i className="fab fa-cc-paypal mx-1 fs-4"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
