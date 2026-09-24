import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.css';
import { formatINR } from '../utils/currency';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const formattedSubtotal = formatINR(cartTotal);

  const shippingFee = cartTotal >= 499 || cartItems.length === 0 ? 0 : 49;
  const grandTotal = cartTotal + shippingFee;

  const formattedGrandTotal = formatINR(grandTotal);

  if (cartItems.length === 0) {
    return (
      <main className={styles.emptyContainer}>
        <div className={styles.emptyCard}>
          <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
            shopping_bag
          </span>
            <h2 className={styles.emptyTitle}>YOUR BAG IS WAITING FOR A LITTLE JOY</h2>
          <p className={styles.emptyText}>
            Your little one’s next favourite outfit might be just around the corner.
          </p>
          <Link to="/shop" className={styles.emptyBtn}>
            EXPLORE BOYSWEAR
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          SHOPPING CART ({cartItems.length})
        </h1>
      </div>

      <div className={styles.grid}>
        
        {/* Left Column: Cart Items */}
        <div className={styles.cartList}>
          {cartItems.map((item, idx) => {
            const lineId = item._cartKey || item._id || item.slug;
            const itemPrice = formatINR((item.discountPrice || item.price) * item.quantity);

            return (
              <div 
                key={lineId || idx}
                className={styles.cartItem}
              >
                {/* Item Image */}
                <div className={styles.itemImageWrap}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                </div>

                {/* Details */}
                <div className={styles.itemDetails}>
                  <div>
                    <div className={styles.itemTopRow}>
                      <h3 className={styles.itemTitle}>
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(lineId)}
                        className={styles.removeBtn}
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>

                    <p className={styles.itemCategory}>
                      {item.category || 'Streetwear'} {item.selectedColor ? `/ ${item.selectedColor}` : ''}
                    </p>

                    {item.selectedSize && (
                      <p className={styles.itemSize}>
                        Size: <span className="font-bold">{item.selectedSize}</span>
                      </p>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className={styles.itemBottomRow}>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() => updateQuantity(lineId, item.quantity - 1)}
                        className={styles.qtyBtn}
                      >
                        -
                      </button>
                      <span className={styles.qtyVal}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(lineId, item.quantity + 1)}
                        className={styles.qtyBtn}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.itemPrice}>
                      {itemPrice}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

          <div className={styles.cartActions}>
            <button
              onClick={clearCart}
              className={styles.clearCartBtn}
            >
              CLEAR ENTIRE CART
            </button>

            <Link to="/shop" className={styles.continueShoppingLink}>
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>
              ORDER SUMMARY
            </h2>

            <p className={styles.shippingProgress}>{cartTotal >= 499 ? 'You unlocked free shipping!' : `Add ${formatINR(499 - cartTotal)} more for free shipping`}</p>
            <div className={styles.shippingTrack}><span style={{ width: `${Math.min(cartTotal / 499 * 100, 100)}%` }} /></div>

            {/* Promo Code Input */}
            <div className={styles.promoGroup}>
              <input
                type="text"
                placeholder="DISCOUNT CODE"
                className={styles.promoInput}
              />
              <button
                type="button"
                className={styles.promoBtn}
              >
                APPLY
              </button>
            </div>

            {/* Line Items */}
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}><span className={styles.summaryLabel}>MRP total</span><span className={styles.summaryVal}>{formatINR(cartItems.reduce((sum,item)=>sum+(item.price||0)*item.quantity,0))}</span></div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal ({cartItems.length} items)</span>
                <span className={styles.summaryVal}>{formattedSubtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Shipping (Standard)</span>
                <span className={styles.summaryVal}>
                  {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                </span>
              </div>
              <div className={styles.summaryRow}><span className={styles.summaryLabel}>GST</span><span className={styles.summaryVal}>Included</span></div>
              <div className={styles.summaryRow}><span className={styles.summaryLabel}>You saved</span><span className={styles.summaryVal}>{formatINR(cartItems.reduce((sum,item)=>sum+Math.max((item.price||0)-(item.discountPrice||item.price||0),0)*item.quantity,0))}</span></div>
            </div>

            <div className={styles.totalSection}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>TOTAL</span>
                <span className={styles.totalAmount}>
                  {formattedGrandTotal}
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className={styles.checkoutBtn}
              >
                <span>PROCEED TO CHECKOUT</span>
                <span className={`material-symbols-outlined ${styles.checkoutBtnArrow}`}>
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustRow}>
              <span className="material-symbols-outlined" title="Secure Payment">lock</span>
              <span className="material-symbols-outlined" title="Verified">verified</span>
              <span className="material-symbols-outlined" title="Local Shipping">local_shipping</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default CartPage;
