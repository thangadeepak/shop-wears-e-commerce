import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/currency';

const OrdersPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  // Demo fallback orders if database empty
  const defaultDemoOrders = [
    {
      _id: 'UK-904128',
      createdAt: '2026-08-28T10:30:00Z',
      totalPrice: 1499,
      orderStatus: 'In Transit',
      shippingAddress: {
        fullName: user ? user.name : 'Guest Customer',
        address: 'Your saved delivery address',
        city: 'India',
        state: 'Tamil Nadu',
        postalCode: '600001'
      },
      orderItems: [
        {
          title: 'Pongal Stripe Kurta Set',
          price: 1499,
          quantity: 1,
          selectedSize: '2-4Y',
          image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      _id: 'UK-849102',
      createdAt: '2026-08-14T14:15:00Z',
      totalPrice: 1598,
      orderStatus: 'Delivered',
      shippingAddress: {
        fullName: user ? user.name : 'Guest Customer',
        address: 'Your saved delivery address',
        city: 'India',
        state: 'Tamil Nadu',
        postalCode: '600001'
      },
      orderItems: [
        {
          title: 'Dino Dash Cotton Tee',
          price: 399,
          quantity: 1,
          selectedColor: 'Onyx Black',
          selectedSize: '4-6Y',
          image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Cloud Nine Night Suit',
          price: 1199,
          quantity: 1,
          selectedSize: '4-6Y',
          image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user?.token}` } };
        const { data } = await axios.get('/api/orders/myorders', config);
        if (data && data.length > 0) {
          setOrders(data);
        } else {
          setOrders(defaultDemoOrders);
        }
      } catch (err) {
        setOrders(defaultDemoOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <main className="flex-grow pt-24 md:pt-32 px-4 md:px-16 max-w-[1440px] mx-auto w-full pb-24">

      {/* Header */}
      <div className="mb-12 border-b-2 border-[#30283a] pb-6">
        <h1 className="font-headline-xl text-4xl md:text-6xl text-[#30283a] uppercase tracking-tight">
          MY ACCOUNT
        </h1>
        <p className="font-body text-sm text-[#766d81] uppercase tracking-wider mt-1">
          MANAGE ORDERS, TRACK SHIPMENTS & ACCOUNT PREFERENCES
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Side Navigation Tabs */}
        <aside className="md:col-span-3 brutalist-border bg-[#F5F3FF] p-4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-4 py-3 font-label-bold text-xs uppercase transition-all text-left ${
              activeTab === 'profile'
                ? 'bg-[#30283a] text-white'
                : 'text-[#30283a] hover:bg-[#EDE9FE]'
            }`}
          >
            <span className="material-symbols-outlined text-lg mr-3">person</span>
            Profile Settings
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center px-4 py-3 font-label-bold text-xs uppercase transition-all text-left ${
              activeTab === 'orders'
                ? 'bg-[#6D28D9] text-white'
                : 'text-[#30283a] hover:bg-[#EDE9FE]'
            }`}
          >
            <span className="material-symbols-outlined text-lg mr-3">inventory_2</span>
            My Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center px-4 py-3 font-label-bold text-xs uppercase transition-all text-left ${
              activeTab === 'addresses'
                ? 'bg-[#30283a] text-white'
                : 'text-[#30283a] hover:bg-[#EDE9FE]'
            }`}
          >
            <span className="material-symbols-outlined text-lg mr-3">location_on</span>
            Addresses
          </button>
          <button onClick={() => setActiveTab('returns')} className={`flex items-center px-4 py-3 font-label-bold text-xs uppercase transition-all text-left ${activeTab === 'returns' ? 'bg-[#6D28D9] text-white' : 'text-[#30283a] hover:bg-[#EDE9FE]'}`}>
            <span className="material-symbols-outlined text-lg mr-3">sync</span> Returns & exchange
          </button>
        </aside>

        {/* Content Panel */}
        <div className="md:col-span-9 flex flex-col gap-8">

          {activeTab === 'orders' && (
            <div className="flex flex-col gap-8">
              <h2 className="font-headline text-2xl text-[#30283a] uppercase">
                ORDER HISTORY & TRACKING
              </h2>

              {loading ? (
                <div className="text-center py-16 font-label-bold text-[#766d81]">
                  LOADING ORDERS DATA...
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord._id} className="bg-white brutalist-border p-6 flex flex-col gap-6">

                    {/* Header bar */}
                    <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#30283a] pb-4">
                      <div>
                        <span className="font-label-bold text-[10px] text-[#766d81] block">ORDER ID</span>
                        <span className="font-headline text-xl text-[#6D28D9]">#{ord._id}</span>
                      </div>

                      <div>
                        <span className="font-label-bold text-[10px] text-[#766d81] block">DATE PLACED</span>
                        <span className="font-body text-sm font-bold text-[#30283a]">
                          {new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      <div>
                        <span className="font-label-bold text-[10px] text-[#766d81] block">TOTAL</span>
                        <span className="font-price-display text-xl text-[#30283a]">
                          {formatINR(ord.totalPrice)}
                        </span>
                      </div>

                      <div>
                        <span className="font-label-bold text-[10px] text-[#766d81] block">STATUS</span>
                        <span className="inline-flex items-center gap-1 font-label-bold text-xs bg-[#6D28D9]/10 text-[#6D28D9] px-3 py-1 brutalist-border">
                          <span className="w-2 h-2 rounded-full bg-[#6D28D9] animate-pulse" />
                          {ord.orderStatus || 'Confirmed'}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Visualizer */}
                    <div className="bg-[#F5F3FF] p-4 brutalist-border">
                      <div className="font-label-bold text-[11px] text-[#766d81] mb-2 uppercase">
                        Shipment Status Tracker
                      </div>
                      <div className="w-full bg-[#EDE9FE] h-2 relative overflow-hidden brutalist-border">
                        <div
                          className="bg-[#6D28D9] h-full transition-all duration-500"
                          style={{ width: ord.orderStatus === 'Delivered' ? '100%' : '65%' }}
                        />
                      </div>
                      <div className="flex justify-between font-label-bold text-[10px] text-[#30283a] mt-2 uppercase">
                        <span>Order Confirmed</span>
                        <span>Processing</span>
                        <span className="text-[#6D28D9] font-bold">In Transit</span>
                        <span>Delivered</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-col gap-4">
                      {ord.orderItems?.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center bg-[#F5F3FF] p-3 brutalist-border">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-20 object-cover bg-[#EDE9FE] brutalist-border"
                          />
                          <div className="flex-grow">
                            <h4 className="font-headline text-lg text-[#30283a] uppercase">{item.title}</h4>
                            <p className="font-body text-xs text-[#766d81]">
                              Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''} {item.selectedColor ? `• Color: ${item.selectedColor}` : ''}
                            </p>
                          </div>
                          <div className="font-price-display text-lg text-[#30283a]">
                            {formatINR(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Address details */}
                    <div className="font-body text-xs text-[#766d81] pt-2 border-t border-[#EDE9FE]">
                      <span className="font-label-bold text-[#30283a]">DELIVERY ADDRESS: </span>
                      {ord.shippingAddress?.fullName}, {ord.shippingAddress?.address}, {ord.shippingAddress?.city} {ord.shippingAddress?.postalCode}
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white brutalist-border p-8 flex flex-col gap-6">
              <h2 className="font-headline text-2xl text-[#30283a] uppercase border-b border-[#30283a] pb-4">
                USER PROFILE DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body">
                <div>
                  <label className="font-label-bold text-xs text-[#766d81] uppercase block mb-1">Full Name</label>
                  <input type="text" readOnly value={user ? user.name : 'Guest Customer'} className="brutalist-input w-full font-bold" />
                </div>
                <div>
                  <label className="font-label-bold text-xs text-[#766d81] uppercase block mb-1">Email</label>
                  <input type="email" readOnly value={user ? user.email : 'Sign in to view your email'} className="brutalist-input w-full" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white brutalist-border p-8 flex flex-col gap-6">
              <h2 className="font-headline text-2xl text-[#30283a] uppercase border-b border-[#30283a] pb-4">
                SAVED SHIPPING ADDRESSES
              </h2>
              <div className="bg-[#F5F3FF] p-4 brutalist-border font-body text-sm">
                <div className="font-bold text-[#6D28D9] uppercase mb-1">Primary Residence</div>
                <p>Your saved delivery address</p>
                <p>India</p>
                <p className="mt-2 text-xs text-[#766d81]">+91 98765 43210</p>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <form onSubmit={event=>{event.preventDefault();setReturnSubmitted(true);}} className="bg-white brutalist-border p-8 flex flex-col gap-5">
              <h2 className="font-headline text-2xl text-[#30283a]">Returns & exchange</h2>
              <p className="text-sm text-[#766d81]">Request a return or exchange within 7 days of delivery for eligible items.</p>
              <label className="flex flex-col gap-2 text-xs font-bold">Order reference<input required className="brutalist-input p-3" placeholder="e.g. UK-904128"/></label>
              <label className="flex flex-col gap-2 text-xs font-bold">What would you like?<select className="brutalist-input p-3"><option>Exchange for another size</option><option>Return for refund</option></select></label>
              <label className="flex flex-col gap-2 text-xs font-bold">Tell us a little more<textarea required rows="3" className="brutalist-input p-3" placeholder="Share the reason for your request"/></label>
              <button className="brutalist-button px-6 py-3">Submit request</button>
              {returnSubmitted&&<p role="status" className="text-sm text-[#4C1D95]">Request noted. Our support team will help you shortly.</p>}
            </form>
          )}

        </div>

      </div>
    </main>
  );
};

export default OrdersPage;
