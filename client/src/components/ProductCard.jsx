import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const id = product._id || product.slug;
  const price = product.discountPrice && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const mainImage = product.image;
  const hoverImage = product.gallery?.[1] || product.gallery?.[0] || product.image;

  const handleNavigate = () => navigate(`/product/${id}`);

  const handleQuickAdd = (e, size) => {
    e.stopPropagation();
    addToCart({ ...product, selectedSize: size }, 1);
  };

  return (
    <div className={styles.card} onClick={handleNavigate}>
      {/* ── Image Container ── */}
      <div className={styles.imageWrapper}>

        {/* Badges */}
        <div className={styles.badges}>
          {product.isFeatured && (
            <span className={styles.badgeNew}>New Drop</span>
          )}
          {hasDiscount && (
            <span className={styles.badgeSale}>Sale</span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={(e) => e.stopPropagation()} className={styles.wishlistBtn}>
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
            favorite
          </span>
        </button>

        {/* Main Image */}
        <img
          src={mainImage}
          alt={product.title}
          className={styles.mainImg}
          loading="lazy"
        />

        {/* Hover Image */}
        <img
          src={hoverImage}
          alt={product.title}
          className={styles.hoverImg}
          loading="lazy"
        />

        {/* Quick Add Overlay */}
        <div className={styles.quickAdd}>
          <p className={styles.quickAddLabel}>Quick Add</p>
          <div className={styles.quickAddSizes}>
            {(product.sizes || ['S', 'M', 'L', 'XL']).slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={(e) => handleQuickAdd(e, size)}
                className={styles.sizeBtn}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product Info ── */}
      <div className={styles.info}>
        <div className={styles.infoRow}>
          <h3 className={styles.title}>{product.title}</h3>
          <div className={styles.priceCol}>
            {hasDiscount && (
              <span className={styles.priceOriginal}>${product.price?.toFixed(2)}</span>
            )}
            <span className={styles.price}>${price?.toFixed(2)}</span>
          </div>
        </div>
        <p className={styles.category}>
          {product.category}{product.colors?.[0] ? ` / ${product.colors[0]}` : ''}
        </p>
        {product.rating && (
          <div className={styles.rating}>
            <span className="material-symbols-outlined text-brand-orange text-sm fill">star</span>
            <span className={styles.ratingText}>{product.rating} ({product.numReviews})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
