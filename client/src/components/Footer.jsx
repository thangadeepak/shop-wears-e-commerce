import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>

        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 flex flex-col">
          <Link to="/" className={styles.brand}>URBAN KINETIC</Link>
          <p className={styles.brandDesc}>Engineered for movement. Designed for the streets.</p>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialLink} aria-label="Share">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>Shop</h4>
          <Link to="/shop" className={styles.colLink}>Shop</Link>
          <Link to="/shop" className={styles.colLink}>Collection</Link>
          <Link to="/shop?tag=collaboration" className={styles.colLink}>Collaboration</Link>
          <Link to="/shop?sale=true" className={styles.colLink}>Sale</Link>
        </div>

        {/* Support Column */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>Support</h4>
          <a href="#" className={styles.colLink}>Customer Care</a>
          <Link to="/orders" className={styles.colLink}>Account</Link>
          <a href="#" className={styles.colLink}>Returns</a>
          <a href="#" className={styles.colLink}>Size Guide</a>
        </div>

        {/* Legal Column */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>Legal</h4>
          <a href="#" className={styles.colLink}>Company</a>
          <a href="#" className={styles.colLink}>Privacy Policy</a>
          <a href="#" className={styles.colLink}>Terms of Service</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>© 2024 URBAN KINETIC. ALL RIGHTS RESERVED.</span>
        <div className={styles.locale}>
          <span className="material-symbols-outlined text-sm">public</span>
          <span className={styles.localeText}>Global (EN)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
