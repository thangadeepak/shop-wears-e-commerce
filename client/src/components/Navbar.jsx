import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, UserRound, MapPin, Menu, X, Languages } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const categories = ['Kurta Sets', 'Party Wear', 'Casual Wear', 'School Wear', 'Ethnic / Festive', 'Nightwear', 'T-Shirts & Shorts', 'Winter Wear'];

export default function Navbar() {
  const { user } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [language, setLanguage] = useState('EN');
  const search = (event) => { event.preventDefault(); if (term.trim()) navigate(`/shop?search=${encodeURIComponent(term.trim())}`); };

  return <>
    <div className={styles.announcement}>Free Shipping above ₹499 <span>·</span> COD Available <span>·</span> Easy 7-Day Returns</div>
    <header className={styles.header}>
      <div className={styles.mainRow}>
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        <Link to="/" className={styles.brand}><span className={styles.brandMark}>ln</span><span>little<span className={styles.brandAccent}>namma</span><small>BOYS · 1–14 YEARS</small></span></Link>
        <form className={styles.search} onSubmit={search}><Search size={18} /><input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search kurtas, tees, festive outfits..." aria-label="Search boys clothing" /><button aria-label="Submit search"><Search size={18} /></button></form>
        <div className={styles.actions}>
          <button className={styles.location} onClick={() => setPinOpen(!pinOpen)}><MapPin size={18} /><span><small>Deliver to</small>{pin || 'Select pincode'}</span></button>
          <button className={styles.language} onClick={() => setLanguage(language === 'EN' ? 'தமிழ்' : 'EN')} aria-label="Toggle language"><Languages size={18} />{language}</button>
          <Link to={user ? '/orders' : '/login'} className={styles.actionLink}><UserRound /><span>Login</span></Link>
          <Link to="/wishlist" className={styles.actionLink}><Heart /><span>Wishlist</span></Link>
          <Link to="/cart" className={styles.actionLink}><span className={styles.bag}><ShoppingBag />{cartItemCount > 0 && <b>{cartItemCount}</b>}</span><span>Cart</span></Link>
        </div>
      </div>
      {pinOpen && <form className={styles.pinPanel} onSubmit={e => { e.preventDefault(); if (/^\d{6}$/.test(pin)) setPin(pin); setPinOpen(false); }}><label htmlFor="pincode">Enter delivery pincode</label><input id="pincode" value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit pincode" inputMode="numeric" /><button type="submit">Check</button></form>}
      <nav className={`${styles.categoryNav} ${menuOpen ? styles.categoryNavOpen : ''}`} aria-label="Shop by category">{categories.map(category => <Link key={category} onClick={() => setMenuOpen(false)} to={`/shop?category=${encodeURIComponent(category)}`}>{category}</Link>)}</nav>
    </header>
  </>;
}
