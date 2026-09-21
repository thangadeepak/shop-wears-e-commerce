import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.section}>
      {/* Background Image */}
      <div className={styles.bgWrapper}>
        <div
          className={styles.bgImage}
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLnbZQJGTMQfMsGxr9tp90nTXc6P8FpD6Wj3txlF7NuBc5ITW2zeVqNqeSr9Z7paBgtWg894v2JUyTH3o6Sy4GFrdCPouPBjIhyRI25sxISKH_Nxmw-L9dGO1s6CNdKpyNc8tbotnifsruOMyXgDDzsv-hqgXI4AnYg3iy6E3jAB7OXlOjnye6exaPEe9IsUVVaEgqKmPDshWdRrhbH86gLcB_G8KtYJHVoJRjq8SA0Tiht3P2IbRl')`
          }}
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={styles.headline}>OWN YOUR<br />EVERYDAY</h1>
          <p className={styles.subtext}>
            Premium essentials built for everyday movement. Engineered for the modern urban environment.
          </p>
          <div className={styles.ctaRow}>
            <Link to="/shop?category=Tops" className={styles.ctaPrimary}>
              SHOP T-SHIRTS
            </Link>
            <Link to="/shop" className={styles.ctaSecondary}>
              EXPLORE NEW ARRIVALS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
