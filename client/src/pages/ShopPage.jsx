import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/sampleProducts';
import styles from './ShopPage.module.css';

const ShopPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || 'All';
  const searchParam = queryParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState('Newest Arrivals');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState({ category: true, size: true, color: false, price: false });

  const categories = ['All', 'Tops', 'Outerwear', 'Footwear', 'Bottoms', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchQuery(searchParam);
  }, [categoryParam, searchParam]);

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

  const toggleSize = (size) =>
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);

  const toggleFilter = (key) =>
    setFiltersOpen(prev => ({ ...prev, [key]: !prev[key] }));

  const filteredProducts = products
    .filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSize = selectedSizes.length === 0 || (p.sizes || []).some(s => selectedSizes.includes(s));
      return matchesCat && matchesSearch && matchesSize;
    })
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      if (sortBy === 'Price: High to Low') return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      if (sortBy === 'Popularity') return (b.numReviews || 0) - (a.numReviews || 0);
      return 0;
    });

  return (
    <main className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <span className="font-bold text-on-surface">
            {selectedCategory !== 'All' ? selectedCategory : 'All Products'}
          </span>
        </nav>

        <div className={styles.headerBottom}>
          <div>
            <h1 className={styles.pageTitle}>
              {selectedCategory !== 'All' ? selectedCategory : 'Full Collection'}
            </h1>
            <p className={styles.resultCount}>Showing {filteredProducts.length} Results</p>
          </div>

          <div className={styles.headerActions}>
            <button className={styles.mobileFilterBtn}>
              <span className="material-symbols-outlined">tune</span> Filters
            </button>
            <div className={styles.sortWrap}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Popularity</option>
              </select>
              <span className={`material-symbols-outlined ${styles.sortIcon}`}>expand_more</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.layout}>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSticky}>

            {/* Category */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle} onClick={() => toggleFilter('category')}>
                Category
                <span className="material-symbols-outlined">{filtersOpen.category ? 'remove' : 'add'}</span>
              </h3>
              {filtersOpen.category && (
                <div className={styles.categoryList}>
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`${styles.categoryLabel} ${selectedCategory === cat ? styles.categoryLabelActive : ''}`}
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className={styles.categoryRadio}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Size */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle} onClick={() => toggleFilter('size')}>
                Size
                <span className="material-symbols-outlined">{filtersOpen.size ? 'remove' : 'add'}</span>
              </h3>
              {filtersOpen.size && (
                <div className={styles.sizeGrid}>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`${styles.sizeBtn} ${selectedSizes.includes(size) ? styles.sizeBtnActive : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Color */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle} onClick={() => toggleFilter('color')}>
                Color
                <span className="material-symbols-outlined">{filtersOpen.color ? 'remove' : 'add'}</span>
              </h3>
              {filtersOpen.color && (
                <div className={styles.colorGrid}>
                  {['#1b1b1c', '#e5e2e1', '#aa3000', '#26333F', '#5c4037'].map((color) => (
                    <button
                      key={color}
                      className={styles.colorSwatch}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle} onClick={() => toggleFilter('price')}>
                Price
                <span className="material-symbols-outlined">{filtersOpen.price ? 'remove' : 'add'}</span>
              </h3>
              {filtersOpen.price && (
                <div className={styles.priceRange}>
                  <div className={styles.priceRangeRow}>
                    <span>$0</span><span>$500+</span>
                  </div>
                  <input type="range" min="0" max="500" className={styles.priceSlider} />
                </div>
              )}
            </div>

            {(selectedCategory !== 'All' || selectedSizes.length > 0 || searchQuery) && (
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedSizes([]); setSearchQuery(''); }}
                className={styles.clearBtn}
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <div className={styles.gridArea}>
          {searchQuery && (
            <div className={styles.searchPill}>
              <span className="material-symbols-outlined text-primary text-sm">search</span>
              <span className={styles.searchPillText}>
                Results for: <strong>{searchQuery}</strong>
              </span>
              <button onClick={() => setSearchQuery('')} className={styles.searchPillClose}>
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}

          {loading ? (
            <div className={styles.productGrid}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImg} />
                  <div className={styles.skeletonLine1} />
                  <div className={styles.skeletonLine2} />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>NO MATCHING APPAREL FOUND</h3>
              <p className={styles.emptyText}>Try clearing your filters or choosing another category.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedSizes([]); setSearchQuery(''); }}
                className={styles.emptyResetBtn}
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
