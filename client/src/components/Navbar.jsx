import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  return (
    <>
      {/* ───── Desktop Navbar ───── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>

          {/* Left: Brand + Links */}
          <div className="flex items-center gap-10">
            <Link to="/" className={styles.brand}>URBAN KINETIC</Link>

            <ul className={styles.navLinks}>
              <li><Link to="/shop?category=Drops" className={styles.navLink}>Drops</Link></li>
              <li><Link to="/shop" className={styles.navLinkActive}>Collection</Link></li>
              <li><Link to="/shop?tag=collaboration" className={styles.navLink}>Collaboration</Link></li>
              <li><Link to="/shop?sale=true" className={styles.navLink}>Sale</Link></li>
            </ul>
          </div>

          {/* Right: Icons */}
          <div className={styles.iconRow}>
            {/* Search */}
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="SEARCH..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />
                <button type="submit" className={styles.iconBtn}>
                  <span className="material-symbols-outlined text-xl">search</span>
                </button>
                <button type="button" onClick={() => setShowSearch(false)} className={styles.iconBtn}>
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </form>
            ) : (
              <button onClick={() => setShowSearch(true)} className={styles.iconBtn}>
                <span className="material-symbols-outlined">search</span>
              </button>
            )}

            <Link to="/shop" className={styles.iconBtn} title="Wishlist">
              <span className="material-symbols-outlined">favorite</span>
            </Link>

            <Link to="/cart" className={styles.iconBtn} title="Cart">
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartItemCount > 0 && (
                <span className={styles.cartBadge}>{cartItemCount}</span>
              )}
            </Link>

            {user ? (
              <div className={styles.accountRow}>
                <Link to="/orders" className={styles.accountLink} title="My Account">
                  <span className="material-symbols-outlined">person</span>
                  <span className={styles.userLabel}>{user.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} className={styles.iconBtn} title="Log Out">
                  <span className="material-symbols-outlined text-xl">logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className={styles.iconBtn} title="Login">
                <span className="material-symbols-outlined">person</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ───── Mobile Header ───── */}
      <header className={styles.mobileHeader}>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-on-surface">
          <span className="material-symbols-outlined text-3xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <Link to="/" className={styles.brand}>URBAN KINETIC</Link>

        <div className={styles.mobileIconGroup}>
          <button onClick={() => setShowSearch(!showSearch)} className="text-on-surface">
            <span className="material-symbols-outlined">search</span>
          </button>
          <Link to="/cart" className="text-on-surface relative">
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartItemCount > 0 && (
              <span className={styles.mobileBadge}>{cartItemCount}</span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className={styles.mobileSearch}>
          <form onSubmit={handleSearchSubmit} className={styles.mobileSearchForm}>
            <span className="material-symbols-outlined text-primary">search</span>
            <input
              type="text"
              placeholder="SEARCH COLLECTION..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.mobileSearchInput}
              autoFocus
            />
            <button type="button" onClick={() => setShowSearch(false)} className="text-on-surface-variant">
              <span className="material-symbols-outlined">close</span>
            </button>
          </form>
        </div>
      )}

      {/* ───── Mobile Drawer ───── */}
      {mobileMenuOpen && (
        <div className={styles.drawer}>
          <div className={styles.drawerLinks}>
            {[
              { label: 'DROPS', to: '/shop?category=Drops' },
              { label: 'COLLECTION', to: '/shop' },
              { label: 'COLLABORATION', to: '/shop?tag=collaboration' },
              { label: 'SALE', to: '/shop?sale=true' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={styles.drawerLink}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.drawerFooter}>
            {user ? (
              <>
                <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className={styles.drawerFooterLink}>
                  <span className="material-symbols-outlined">inventory_2</span> MY ORDERS & ACCOUNT
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className={styles.drawerFooterLogout}
                >
                  <span className="material-symbols-outlined">logout</span> LOG OUT
                </button>
              </>
            ) : (
              <div className={styles.drawerAuthGrid}>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLoginBtn}>
                  LOG IN
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className={styles.drawerSignupBtn}>
                  SIGN UP
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
