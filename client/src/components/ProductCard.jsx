import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, wishlistItems, toggleWishlist } = useCart();
  const saved = wishlistItems.some(item => (item._id || item.slug) === (product._id || product.slug));
  const price = product.discountPrice && product.discountPrice < product.price ? product.discountPrice : product.price;
  const discount = product.price > price ? Math.round((product.price - price) / product.price * 100) : 0;
  const sizes = product.sizes || ['0-2Y','2-4Y','4-6Y'];
  const openProduct = () => navigate(`/product/${product._id || product.slug}`);
  const quickAdd = event => { event.stopPropagation(); addToCart({ ...product, selectedSize: sizes[0] }, 1); };
  return <article className={styles.card} onClick={openProduct} tabIndex="0" onKeyDown={event=>event.key==='Enter'&&openProduct()} aria-label={`View ${product.title}`}>
    <div className={styles.imageWrapper}>
      <img src={product.image} alt={`${product.title}, boys clothing for ages ${product.age || '1 to 14 years'}`} loading="lazy" />
      {discount > 0 && <span className={styles.saleBadge}>{discount}% OFF</span>}
      <button className={`${styles.wishlistBtn} ${saved?styles.saved:''}`} onClick={event=>{event.stopPropagation();toggleWishlist(product);}} aria-label={saved?'Remove from wishlist':'Add to wishlist'}><Heart size={18} fill={saved?'currentColor':'none'}/></button>
    </div>
    <div className={styles.info}>
      <div className={styles.meta}><span>{product.fabric || 'Soft cotton'}</span><span className={styles.age}>{product.age || '1–14Y'}</span></div>
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.rating}><Star size={13} fill="currentColor"/><b>{product.rating || '4.6'}</b><span>({product.numReviews || 24})</span></div>
      <div className={styles.priceRow}><b className={styles.price}>{formatINR(price)}</b>{discount>0&&<><del>{formatINR(product.price)}</del><span>{discount}% off</span></>}</div>
      <button className={styles.quickAdd} onClick={quickAdd}><ShoppingBag size={15}/> Add to cart</button>
    </div>
  </article>;
}
