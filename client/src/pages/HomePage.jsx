import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/sampleProducts';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

// Countdown Timer Component
const CountdownTimer = () => {
  const [time, setTime] = useState({ days: 3, hours: 14, mins: 59, secs: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={styles.countdown}>
      {[
        { value: pad(time.days), label: 'Days' },
        { value: pad(time.hours), label: 'Hrs' },
        { value: pad(time.mins), label: 'Min' },
        { value: pad(time.secs), label: 'Sec' },
      ].map(({ value, label }) => (
        <div key={label} className={styles.countUnit}>
          {value}
          <span className={styles.countLabel}>{label}</span>
        </div>
      ))}
    </div>
  );
};

const bentoCategories = [
  {
    name: 'T-SHIRTS',
    to: '/shop?category=Tops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjR19tRoOzu37G7F68FuhIm2vZBdt3jEcX8slzZI79t-U4dTPvVWAnaJJhxxDaOhHrKesD3p-F2qSMK4IppOcIXtzKvja0m3CE-sG39RxgkTZSp5cX6AXptXYy1HcCTzFSlvcNl99nPkFGs8Jdnmp_PrAF-jM-JzvPN1Gfld1LqQgALUHYyihdZbcSNt1c-z01GdTbq5hgX30XskX_pp4YAABjr51MElTdSBDQO-N63hWbqSRI6zn-',
  },
  {
    name: 'SHORTS',
    to: '/shop?category=Bottoms',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs-59M4A0MYbVcQGqxqGLuAPoY_ODm_9Ms9YnpXQwAqZH0o8gXFapSmQwDHKUGJSET39jZVEi2G05JVzMFRsHey8b80iovXnKN3hPHouXf7geDjXVi89hjFXcv2dZWs9reyt8YQzaa6Ubn5TrDKhBqwSPkUNyy06oMuhLYMU8Z8Hwcd2sS2bofv5LNujQQV9aUHLC5vBu6B7XVNKQugr9i9F_Ro8kaT2W75TuNccARQSUHrpZulWIy',
  },
  {
    name: 'HOODIES',
    to: '/shop?category=Outerwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4kUoQpKHCHsqrUtkoKFZ8WSUrava96LlDdSISaElpuzn01R0TxY2WdvOclkpqSEi7ssJ-OdR4Yhe_xTOwswd52fJEbsU-w2ZjmnxkSLHs09v7jcsVx34sEw5V0tONHyQzoJvvfyrSEfrQbOOyhW-MR_84voq_XEhhbHyktn01kHVVmTOKvSksCq4HHWT1knSfA0MKW8v_894dI30g1cG7ELhrlpiYZzwOtyxMP349FGGj7w99VRnD',
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data && data.length > 0 ? data : sampleProducts);
      } catch {
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />

      {/* ── Categories Bento Grid ── */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Categories</h2>
        </div>

        <div className={styles.bentoGrid}>
          {/* Large tile */}
          <Link to={bentoCategories[0].to} className={styles.bentoLarge}>
            <div className={styles.bentoBg} style={{ backgroundImage: `url('${bentoCategories[0].image}')` }} />
            <div className={styles.bentoOverlay} />
            <div className={styles.bentoLabel}>
              <h3 className={styles.bentoTitle}>{bentoCategories[0].name}</h3>
              <span className={styles.bentoShopBtn}>Shop Now</span>
            </div>
          </Link>

          {/* Stacked small tiles */}
          <div className={styles.bentoStack}>
            {bentoCategories.slice(1).map((cat) => (
              <Link key={cat.name} to={cat.to} className={styles.bentoSmall}>
                <div className={styles.bentoBg} style={{ backgroundImage: `url('${cat.image}')` }} />
                <div className={styles.bentoOverlay} />
                <div className={styles.bentoSmallLabel}>
                  <h3 className={styles.bentoSmallTitle}>{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className={styles.arrivalsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>NEW ARRIVALS</h2>
          <Link to="/shop" className={styles.sectionViewAll}>View All</Link>
        </div>

        {loading ? (
          <div className={styles.arrivalsGrid}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.skeleton}>
                <div className={styles.skeletonImg} />
                <div className={styles.skeletonLine1} />
                <div className={styles.skeletonLine2} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.arrivalsGrid}>
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ── Limited Drop Banner ── */}
      <section className={styles.dropBanner}>
        <div
          className={styles.dropBannerBg}
          style={{ background: 'radial-gradient(circle at center, rgba(255,77,0,0.4) 0%, transparent 70%)' }}
        />
        <div className={styles.dropBannerInner}>
          <div className={styles.dropLeft}>
            <span className={styles.dropPulse} />
            <h2 className={styles.dropTitle}>LIMITED DROP</h2>
            <span className={styles.dropSub}>- Once it's gone, it's gone.</span>
          </div>

          <CountdownTimer />

          <Link to="/shop" className={styles.dropCta}>View Drop</Link>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <span className={`material-symbols-outlined ${styles.newsletterIcon}`} style={{ fontSize: '48px' }}>mail</span>
          <h2 className={styles.newsletterTitle}>GET THE DROP FIRST</h2>
          <p className={styles.newsletterSub}>
            Sign up to receive updates on exclusive releases, early access to sales, and insider content.
          </p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.newsletterInputWrap}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className={styles.newsletterInput}
              />
            </div>
            <button type="submit" className={styles.newsletterBtn}>SUBSCRIBE</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
