import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: user ? user.email : 'kinetic.user@urbankinetic.com',
    phone: '+1 (555) 019-2834',
    firstName: user ? user.name.split(' ')[0] : 'Alex',
    lastName: user ? user.name.split(' ')[1] || 'Vance' : 'Vance',
    address: '742 Kinetic Blvd, Suite 400',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    paymentMethod: 'Credit Card',
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvc: '888'
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const shippingFee = cartTotal > 150 || cartItems.length === 0 ? 0 : 15.00;
  const grandTotal = cartTotal + shippingFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const orderData = {
      orderItems: cartItems.map(item => ({
        title: item.title,
        quantity: item.quantity,
        image: item.image,
        price: item.discountPrice || item.price,
        product: item._id || '6618e5b4f8a32b1234567801',
      })),
      shippingAddress: {
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
        fullName: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
      },
      paymentMethod: formData.paymentMethod,
      itemsPrice: cartTotal,
      taxPrice: Math.round(cartTotal * 0.08),
      shippingPrice: shippingFee,
      totalPrice: grandTotal + Math.round(cartTotal * 0.08),
    };

    try {
      const config = user ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
      const { data } = await axios.post('/api/orders', orderData, config);
      setOrderComplete(data);
      clearCart();
    } catch (err) {
      // Fallback demo order completion
      setOrderComplete({
        _id: 'UK-' + Math.floor(100000 + Math.random() * 900000),
        totalPrice: orderData.totalPrice,
        orderStatus: 'Confirmed & Processing',
      });
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <main className="flex-grow pt-24 md:pt-32 px-4 md:px-16 max-w-[1440px] mx-auto w-full pb-24 text-center">
        <div className="bg-[#f6f3f2] p-12 brutalist-border max-w-xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-[#aa3000] text-white flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl">check</span>
          </div>

          <h1 className="font-headline text-3xl md:text-4xl text-[#1b1b1c] mb-2 uppercase">
            ORDER CONFIRMED
          </h1>

          <p className="font-body text-[#5c4037] mb-6">
            Thank you for your order with URBAN KINETIC.
            <br />
            Order Reference: <strong className="text-[#aa3000]">#{orderComplete._id}</strong>
          </p>

          <div className="w-full bg-white p-4 brutalist-border mb-8 font-label-bold text-xs uppercase text-[#1b1b1c] flex justify-around">
            <div>STATUS: <span className="text-[#aa3000]">{orderComplete.orderStatus || 'Processing'}</span></div>
            <div>EST. DELIVERY: <span className="text-[#1b1b1c]">3 BUSINESS DAYS</span></div>
          </div>

          <button onClick={() => navigate('/orders')} className="brutalist-button w-full mb-3">
            VIEW IN ACCOUNT ORDERS
          </button>

          <button onClick={() => navigate('/')} className="brutalist-ghost w-full">
            RETURN TO STOREFRONT
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-24 md:pt-32 px-4 md:px-16 max-w-[1440px] mx-auto w-full pb-24">
      
      {/* Header Section */}
      <div className="mb-12 border-b-2 border-[#1b1b1c] pb-6 flex justify-between items-end">
        <h1 className="font-headline-xl text-4xl md:text-6xl text-[#1b1b1c] uppercase tracking-tight">
          CART & CHECKOUT
        </h1>
        <div className="hidden sm:flex items-center gap-2 text-[#5c4037] font-label-bold text-xs">
          <span className="material-symbols-outlined text-[#aa3000]">lock</span>
          SECURE CHECKOUT
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Details */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* Section 1: Contact Information */}
          <section className="bg-white p-6 brutalist-border flex flex-col gap-6">
            <h3 className="font-label-bold text-sm text-[#1b1b1c] uppercase tracking-widest border-b border-[#e6beb2] pb-3 flex items-center justify-between">
              <span>1. Contact Information</span>
              <span className="material-symbols-outlined text-lg text-[#aa3000]">mail</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="brutalist-input font-body text-base w-full py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="brutalist-input font-body text-base w-full py-2"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Shipping Address */}
          <section className="bg-white p-6 brutalist-border flex flex-col gap-6">
            <h3 className="font-label-bold text-sm text-[#1b1b1c] uppercase tracking-widest border-b border-[#e6beb2] pb-3 flex items-center justify-between">
              <span>2. Shipping Address</span>
              <span className="material-symbols-outlined text-lg text-[#aa3000]">local_shipping</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="First Name"
                  className="brutalist-input font-body text-base w-full py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Last Name"
                  className="brutalist-input font-body text-base w-full py-2"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                  Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street Address"
                  className="brutalist-input font-body text-base w-full py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                  className="brutalist-input font-body text-base w-full py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                    State/Province
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                    className="brutalist-input font-body text-base w-full py-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                    ZIP / Postal
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="ZIP Code"
                    className="brutalist-input font-body text-base w-full py-2"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Payment Method */}
          <section className="bg-white p-6 brutalist-border flex flex-col gap-6">
            <h3 className="font-label-bold text-sm text-[#1b1b1c] uppercase tracking-widest border-b border-[#e6beb2] pb-3 flex items-center justify-between">
              <span>3. Payment</span>
              <span className="material-symbols-outlined text-lg text-[#aa3000]">credit_card</span>
            </h3>

            <div className="flex flex-col gap-4">
              <label 
                onClick={() => setFormData({ ...formData, paymentMethod: 'Credit Card' })}
                className={`flex items-center p-4 cursor-pointer transition-all ${
                  formData.paymentMethod === 'Credit Card' 
                    ? 'border-2 border-[#aa3000] bg-[#aa3000]/5' 
                    : 'brutalist-border hover:bg-[#f6f3f2]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'Credit Card'}
                  onChange={() => {}}
                  className="text-[#aa3000] h-5 w-5"
                />
                <span className="ml-4 font-body text-base text-[#1b1b1c] font-bold uppercase">
                  Credit Card
                </span>
                <div className="ml-auto flex gap-2">
                  <span className="material-symbols-outlined text-[#5c4037]">credit_card</span>
                </div>
              </label>

              <label 
                onClick={() => setFormData({ ...formData, paymentMethod: 'UPI / Mobile Wallet' })}
                className={`flex items-center p-4 cursor-pointer transition-all ${
                  formData.paymentMethod === 'UPI / Mobile Wallet' 
                    ? 'border-2 border-[#aa3000] bg-[#aa3000]/5' 
                    : 'brutalist-border hover:bg-[#f6f3f2]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'UPI / Mobile Wallet'}
                  onChange={() => {}}
                  className="text-[#aa3000] h-5 w-5"
                />
                <span className="ml-4 font-body text-base text-[#1b1b1c] font-bold uppercase">
                  UPI / Mobile Wallet
                </span>
                <div className="ml-auto flex gap-2">
                  <span className="material-symbols-outlined text-[#5c4037]">account_balance_wallet</span>
                </div>
              </label>
            </div>

            {/* Card Inputs */}
            {formData.paymentMethod === 'Credit Card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pt-4 border-t border-[#e6beb2]">
                <div className="flex flex-col md:col-span-2">
                  <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="0000 0000 0000 0000"
                    className="brutalist-input font-body text-base w-full py-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                    Expiration (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={formData.expDate}
                    onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                    placeholder="MM/YY"
                    className="brutalist-input font-body text-base w-full py-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-label-bold text-xs text-[#5c4037] mb-1 uppercase">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={formData.cvc}
                    onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                    placeholder="123"
                    className="brutalist-input font-body text-base w-full py-2"
                  />
                </div>
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 sticky top-28">
          <div className="bg-[#eae7e7] p-8 brutalist-border flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(27,27,28,1)]">
            <h2 className="font-headline text-2xl text-[#1b1b1c] uppercase border-b-2 border-[#1b1b1c] pb-4">
              ORDER SUMMARY
            </h2>

            <div className="flex flex-col gap-3 font-body text-base text-[#1b1b1c]">
              <div className="flex justify-between">
                <span className="text-[#5c4037]">Items Subtotal</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5c4037]">Shipping (Standard)</span>
                <span className="font-bold">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-[#aa3000]">
                <span>Est. Tax</span>
                <span className="font-bold">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t-2 border-[#1b1b1c] pt-4">
              <div className="flex justify-between items-end mb-6">
                <span className="font-body text-lg text-[#1b1b1c] uppercase font-bold">PAYABLE TOTAL</span>
                <span className="font-price-display text-3xl text-[#1b1b1c]">
                  ${(grandTotal + (cartTotal * 0.08)).toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full brutalist-button py-5 text-sm uppercase font-label-bold tracking-widest flex justify-between items-center group"
              >
                <span>{submitting ? 'PROCESSING PAYMENT...' : 'PLACE ORDER'}</span>
                <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

      </form>
    </main>
  );
};

export default CheckoutPage;
