import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sampleProducts } from '../data/sampleProducts';
import { useCart } from '../context/CartContext';
import styles from './ProductDetailPage.module.css';
import { formatINR } from '../utils/currency';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, wishlistItems, toggleWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Onyx Black');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [fitFeedback, setFitFeedback] = useState('');

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
    return <div className={styles.loadingWrap}>Finding your little favourite…</div>;
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
  const wishlisted = wishlistItems.some(item => (item._id || item.slug) === (product._id || product.slug));

  const formattedPrice = formatINR(product.discountPrice || product.price);

  const toggleAccordion = (section) =>
    setOpenAccordion(openAccordion === section ? null : section);

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor, selectedSize }, quantity);
  };

  const colorOptions = [
    { label: 'Lavender', hex: '#A78BFA' },
    { label: 'Plum', hex: '#4C1D95' },
    { label: 'White', hex: '#ffffff' },
  ];
  const kidsSizes = ['0-2Y', '2-4Y', '4-6Y', '6-8Y', '8-10Y', '10-14Y'];
  const discountPercent = product.price > (product.discountPrice || product.price) ? Math.round((product.price - product.discountPrice) / product.price * 100) : 0;
  const buyNow = () => { handleAddToCart(); navigate('/cart'); };

  return (
    <main className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link className={styles.breadcrumbLink} to="/">Home</Link> /
        <Link className={styles.breadcrumbLink} to="/shop">Boys clothing</Link> /
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
            {discountPercent > 0 && <><del>{formatINR(product.price)}</del><span className={styles.discount}>{discountPercent}% OFF</span></>}
            <div className={styles.ratingRow}>
              {[...Array(4)].map((_, i) => (
                <span key={i} className={`material-symbols-outlined fill ${styles.ratingIcon}`}>star</span>
              ))}
              <span className={`material-symbols-outlined ${styles.ratingIconHalf}`}>star_half</span>
              <span className={styles.ratingCount}>({product.numReviews || 128} Reviews)</span>
            </div>
          </div>

          <p className={styles.description}>{product.description}</p>
          <p className={styles.taxNote}>Inclusive of all taxes · Free delivery above ₹499</p>
          <div className={styles.offerBox}><strong>Little Namma offer</strong><span>Free delivery on orders above ₹499 · COD available on eligible pincodes</span><span>Inclusive of all taxes. No hidden charges at checkout.</span></div>

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
              {kidsSizes.map((sz) => (
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

          <form className={styles.deliveryCheck} onSubmit={e=>{e.preventDefault();setDeliveryMessage(/^\d{6}$/.test(pincode)?'Delivery in 3–7 days · COD available':'Enter a valid 6-digit pincode');}}>
            <label htmlFor="delivery-pincode">Check delivery & COD availability</label>
            <div><input id="delivery-pincode" value={pincode} onChange={e=>setPincode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="Enter 6-digit pincode" inputMode="numeric"/><button type="submit">Check</button></div>
            {deliveryMessage&&<small>{deliveryMessage}</small>}
          </form>

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
              <button onClick={buyNow} className={styles.buyNowBtn}>BUY NOW</button>
            </div>

            <button className={styles.wishlistBtn} onClick={()=>toggleWishlist(product)}>
              <span className="material-symbols-outlined text-xl">favorite</span> {wishlisted?'SAVED TO WISHLIST':'ADD TO WISHLIST'}
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
                    <p>- Fabric: {product.fabric || 'Soft cotton'}</p>
                    <p>- Suggested age: {product.age || '1–14 years'}</p>
                    <p>- Easy, comfortable fit for everyday play</p>
                    <p>- Gentle machine wash with like colours</p>
                    <p>- Soft finish for little ones’ comfort</p>
                  </div>
                ),
              },
              {
                key: 'shipping',
                title: 'DELIVERY & RETURNS',
                content: (
                  <div className={styles.accordionContent}>
                    <p>Delivery usually takes 3–7 business days across India.</p>
                    <p>Free shipping above ₹499. Eligible items can be returned within 7 days.</p>
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

      <section className={styles.recommendations}>
        <div className={styles.recommendationHeader}><span>MORE LITTLE FAVOURITES</span><h2>You may also love</h2></div>
        <div className={styles.recommendationGrid}>{sampleProducts.filter(item=>item._id!==product._id).slice(0,4).map(item=><ProductCard key={item._id} product={item}/>)}</div>
      </section>
      <section className={styles.fitFeedback}><h3>How does the fit feel?</h3><div>{['True to size','Runs small','Runs large'].map(feedback=><button className={fitFeedback===feedback?styles.fitSelected:''} key={feedback} onClick={()=>setFitFeedback(feedback)}>{feedback}</button>)}</div></section>

      {/* Size Guide Modal */}
      {sizeModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button onClick={() => setSizeModalOpen(false)} className={styles.modalClose}>
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <h3 className={styles.modalTitle}>BOYS SIZE GUIDE</h3>
            <p className={styles.modalText}>
              Choose by age, then check your child’s height and chest. If between sizes, choose the larger size for more growing room.
            </p>
            <table className={styles.sizeTable}>
              <thead className={styles.sizeTableHead}>
                <tr>
                  <th className={styles.sizeTableTh}>AGE</th>
                  <th className={styles.sizeTableTh}>HEIGHT (CM)</th>
                  <th className={styles.sizeTableTh}>CHEST (CM)</th>
                </tr>
              </thead>
              <tbody className={styles.sizeTableBody}>
                <tr><td className={styles.sizeTableTdBold}>0–2Y</td><td className={styles.sizeTableTd}>80–92</td><td className={styles.sizeTableTd}>50–54</td></tr>
                <tr><td className={styles.sizeTableTdBold}>2–4Y</td><td className={styles.sizeTableTd}>92–104</td><td className={styles.sizeTableTd}>54–58</td></tr>
                <tr className={styles.sizeTableRowHighlight}><td className={styles.sizeTableTdHighlight}>4–6Y</td><td className={styles.sizeTableTd}>104–116</td><td className={styles.sizeTableTd}>58–62</td></tr>
                <tr><td className={styles.sizeTableTdBold}>6–8Y</td><td className={styles.sizeTableTd}>116–128</td><td className={styles.sizeTableTd}>62–66</td></tr>
                <tr><td className={styles.sizeTableTdBold}>8–10Y</td><td className={styles.sizeTableTd}>128–140</td><td className={styles.sizeTableTd}>66–72</td></tr>
                <tr><td className={styles.sizeTableTdBold}>10–14Y</td><td className={styles.sizeTableTd}>140–164</td><td className={styles.sizeTableTd}>72–82</td></tr>
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
