import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sampleProducts } from '../data/sampleProducts';
import { useCart } from '../context/CartContext';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Onyx Black');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[2] || data.sizes[0]);
      } catch {
        const found = sampleProducts.find(
          p => p.slug === id || p._id === id || p.title.toLowerCase().replace(/\s+/g, '-') === id
        );
        const pData = found || sampleProducts[0];
        setProduct(pData);
        if (pData.colors?.length > 0) setSelectedColor(pData.colors[0]);
        if (pData.sizes?.length > 0) setSelectedSize(pData.sizes[2] || pData.sizes[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className={styles.loadingWrap}>LOADING PRODUCT SPECIFICATION...</div>;
  }

  if (!product) {
    return (
      <div className={styles.notFoundWrap}>
        <h2 className={styles.notFoundTitle}>PRODUCT NOT FOUND</h2>
        <Link to="/shop" className={styles.notFoundBtn}>RETURN TO CATALOG</Link>
      </div>
    );
  }

  const galleryImages = product.gallery?.length > 0
    ? product.gallery
    : [product.image, product.image, product.image, product.image];

  const isInCart = cartItems.some(item => item._id === product._id || item.slug === product.slug);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.discountPrice || product.price);

  const toggleAccordion = (section) =>
    setOpenAccordion(openAccordion === section ? null : section);

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor, selectedSize }, quantity);
  };

  const colorOptions = [
    { label: 'Onyx Black', hex: '#1A1A1A' },
    { label: 'Concrete Grey', hex: '#E5E5E5' },
    { label: 'Kinetic Orange', hex: '#FF4D00' },
  ];

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link className={styles.breadcrumbLink} to="/">Home</Link> /
        <Link className={styles.breadcrumbLink} to="/shop">Collection</Link> /
        <span className="text-on-surface">{product.title}</span>
      </div>

      {/* Product Hero */}
      <div className={styles.productHero}>

        {/* Gallery */}
        <div className={styles.gallery}>
          {/* Thumbnails */}
          <div className={styles.thumbnails}>
            {galleryImages.slice(0, 4).map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`${styles.thumbnailBtn} ${activeImageIndex === idx ? styles.thumbnailBtnActive : ''}`}
              >
                <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} className={styles.thumbnailImg} />
              </button>
            ))}
          </div>

          {/* Main Display */}
          <div className={styles.mainImage}>
            <img
              src={galleryImages[activeImageIndex] || product.image}
              alt={product.title}
              className={styles.mainImg}
            />
            {/* Mobile dots */}
            <div className={styles.mobileDots}>
              {galleryImages.slice(0, 4).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`${styles.mobileDot} ${activeImageIndex === idx ? styles.mobileDotActive : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <h1 className={styles.productTitle}>{product.title}</h1>

          <div className={styles.priceRow}>
            <div className={styles.price}>{formattedPrice}</div>
            <div className={styles.ratingRow}>
              {[...Array(4)].map((_, i) => (
                <span key={i} className={`material-symbols-outlined fill ${styles.ratingIcon}`}>star</span>
              ))}
              <span className={`material-symbols-outlined ${styles.ratingIconHalf}`}>star_half</span>
              <span className={styles.ratingCount}>({product.numReviews || 128} Reviews)</span>
            </div>
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Color */}
          <div className={styles.colorSection}>
            <div className={styles.selectorHeader}>
              <span className={styles.selectorLabel}>
                Color: <span className={styles.selectedValue}>{selectedColor}</span>
              </span>
            </div>
            <div className={styles.colorBtns}>
              {colorOptions.map(({ label, hex }) => (
                <button
                  key={label}
                  onClick={() => setSelectedColor(label)}
                  aria-label={`Select ${label}`}
                  className={`${styles.colorBtn} ${selectedColor === label ? styles.colorBtnActive : ''}`}
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className={styles.sizeSection}>
            <div className={styles.selectorHeader}>
              <span className={styles.selectorLabel}>
                Size: <span className={styles.selectedValue}>{selectedSize}</span>
              </span>
              <button onClick={() => setSizeModalOpen(true)} className={styles.sizeGuideBtn}>
                Size Guide
              </button>
            </div>
            <div className={styles.sizeGrid}>
              {['S', 'M', 'L', 'XL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`${styles.sizeBtn} ${selectedSize === sz ? styles.sizeBtnActive : ''}`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.actionsRow}>
              {/* Quantity */}
              <div className={styles.quantityControl}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className={styles.qtyBtn}>
                  <span className="material-symbols-outlined text-base">remove</span>
                </button>
                <span className={styles.qtyDisplay}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className={styles.qtyBtn}>
                  <span className="material-symbols-outlined text-base">add</span>
                </button>
              </div>

              {/* Add to Cart */}
              <button onClick={handleAddToCart} className={styles.addToCartBtn}>
                <span className="material-symbols-outlined text-xl">
                  {isInCart ? 'check_circle' : 'shopping_bag'}
                </span>
                {isInCart ? 'UPDATE IN CART' : 'ADD TO CART'}
              </button>
            </div>

            <button className={styles.wishlistBtn}>
              <span className="material-symbols-outlined text-xl">favorite</span> ADD TO WISHLIST
            </button>
          </div>

          {/* Accordions */}
          <div className={styles.accordion}>
            {[
              {
                key: 'desc',
                title: 'DETAILS',
                content: (
                  <div className={styles.accordionContent}>
                    <p>- 100% Premium Heavyweight Cotton (240gsm)</p>
                    <p>- Dropped shoulders for an oversized, boxy fit</p>
                    <p>- Thick ribbed crewneck collar</p>
                    <p>- Pre-shrunk to minimize shrinkage</p>
                    <p>- Printed care label for ultimate skin comfort</p>
                  </div>
                ),
              },
              {
                key: 'shipping',
                title: 'SHIPPING & RETURNS',
                content: (
                  <div className={styles.accordionContent}>
                    <p>Standard shipping arrives within 3-5 business days.</p>
                    <p>Free returns within 30 days of delivery on unworn items.</p>
                  </div>
                ),
              },
            ].map(({ key, title, content }) => (
              <div key={key} className={styles.accordionItem}>
                <button onClick={() => toggleAccordion(key)} className={styles.accordionBtn}>
                  <span className={styles.accordionTitle}>{title}</span>
                  <span className="material-symbols-outlined">
                    {openAccordion === key ? 'remove' : 'add'}
                  </span>
                </button>
                {openAccordion === key && content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {sizeModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button onClick={() => setSizeModalOpen(false)} className={styles.modalClose}>
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <h3 className={styles.modalTitle}>OVERSIZED SIZE MATRIX</h3>
            <p className={styles.modalText}>
              Our streetwear garments are cut for a boxy, dropped-shoulder fit. If you prefer a regular tailored fit, order one size down.
            </p>
            <table className={styles.sizeTable}>
              <thead className={styles.sizeTableHead}>
                <tr>
                  <th className={styles.sizeTableTh}>SIZE</th>
                  <th className={styles.sizeTableTh}>CHEST (IN)</th>
                  <th className={styles.sizeTableTh}>LENGTH (IN)</th>
                </tr>
              </thead>
              <tbody className={styles.sizeTableBody}>
                <tr><td className={styles.sizeTableTdBold}>S</td><td className={styles.sizeTableTd}>42 - 44</td><td className={styles.sizeTableTd}>28</td></tr>
                <tr><td className={styles.sizeTableTdBold}>M</td><td className={styles.sizeTableTd}>44 - 46</td><td className={styles.sizeTableTd}>29</td></tr>
                <tr className={styles.sizeTableRowHighlight}><td className={styles.sizeTableTdHighlight}>L</td><td className={styles.sizeTableTd}>46 - 48</td><td className={styles.sizeTableTd}>30</td></tr>
                <tr><td className={styles.sizeTableTdBold}>XL</td><td className={styles.sizeTableTd}>48 - 50</td><td className={styles.sizeTableTd}>31</td></tr>
              </tbody>
            </table>
            <button onClick={() => setSizeModalOpen(false)} className={styles.modalCloseBtn}>
              CLOSE GUIDE
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailPage;
