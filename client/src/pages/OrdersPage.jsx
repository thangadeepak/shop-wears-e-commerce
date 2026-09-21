import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo fallback orders if database empty
  const defaultDemoOrders = [
    {
      _id: 'UK-904128',
      createdAt: '2026-08-28T10:30:00Z',
      totalPrice: 245.00,
      orderStatus: 'In Transit',
      shippingAddress: {
        fullName: user ? user.name : 'Alex Vance',
        address: '742 Kinetic Blvd, Suite 400',
        city: 'New York',
        state: 'NY',
        postalCode: '10001'
      },
      orderItems: [
        {
          title: 'KINETIC RUNNER V2',
          price: 245.00,
          quantity: 1,
          selectedSize: '42 EU',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuVwQv18_y8s0txZbt7xYp_hTIGtvA7wuft50avS_zpBCfhYB1wgY3IwrMfuF2sKftps-LdOfiewCiUvWtV0qdfn9e2bHH5PgxFNH6U2FvEcGpKXooiRAnVf10zSKNXwOdIvduLJ0u5LMhlDXUSLSoFmuU_DdDhlnCX5Dg-zVpQf2cYGYc2GPMSAD2Wbj8vvAxLw_9IMlD1xOFjS4d-b_kNQqDVx0GJAWcNpo-i3mi5psCuqfYaiNT'
        }
      ]
    },
    {
      _id: 'UK-849102',
      createdAt: '2026-08-14T14:15:00Z',
      totalPrice: 225.00,
      orderStatus: 'Delivered',
      shippingAddress: {
        fullName: user ? user.name : 'Alex Vance',
        address: '742 Kinetic Blvd, Suite 400',
        city: 'New York',
        state: 'NY',
        postalCode: '10001'
      },
      orderItems: [
        {
          title: 'URBAN ESSENTIAL OVERSIZED TEE',
          price: 45.00,
          quantity: 1,
          selectedColor: 'Onyx Black',
          selectedSize: 'L',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWTkGrGBgtwd-CqdmRe5faxoEjpdmueq5f1jqK5k2x_3EiOJHUua9xVZWU5FdfbYtr6BwXzVT55opvHUVCWaOERAbuPdkIhMLtXpEgLIO69M8XBKkE_zKc2B7SWDy0eZcCOrHNFG_VDbTcgA7BRBA9PxzE3XQ2AxWDoiN3R19bHMt1ZnymJ2XNNFfSkmnD2p-GB1L7A0nOFA0A53LK-LmJ2HfhrE2wKTLBDJI95ODhDncmdGAZHhBB'
        },
        {
          title: 'STRUCTURAL HOODIE',
          price: 180.00,
          quantity: 1,
          selectedSize: 'L',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAEyKAZvhRgh2iXnMH3ngXmT4qSZafLeTAlArDvZMe96Rpt_D4f_GyhcCIsDAlkK9zm8hlxJEoXLS6v2uXh61mE--OaYemRegU002jxFmnC8_wUzystM1KgTfIE3Xi1G58Z6DOuvWO4LLpFvmDoJ9M2AR8WQ8j6JdOWXRGjv9aZQhq4q38j4RBRkKF7tPEH7VsjXWJ1jy9PrY3C4Vcdf6X57dch9NXmaptiA0bpE9ebylBoFpWyjf2'
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
      <div className="mb-12 border-b-2 border-[#1b1b1c] pb-6">
        <h1 className="font-headline-xl text-4xl md:text-6xl text-[#1b1b1c] uppercase tracking-tight">
          MY ACCOUNT
        </h1>
        <p className="font-body text-sm text-[#5c4037] uppercase tracking-wider mt-1">
          MANAGE ORDERS, TRACK SHIPMENTS & ACCOUNT PREFERENCES
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Side Navigation Tabs */}
        <aside className="md:col-span-3 brutalist-border bg-[#f6f3f2] p-4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-4 py-3 font-label-bold text-xs uppercase transition-all text-left ${
              activeTab === 'profile'
                ? 'bg-[#1b1b1c] text-white'
                : 'text-[#1b1b1c] hover:bg-[#eae7e7]'
            }`}
          >
            <span className="material-symbols-outlined text-lg mr-3">person</span>
            Profile Settings
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center px-4 py-3 font-label-bold text-xs uppercase transition-all text-left ${
              activeTab === 'orders'
                ? 'bg-[#aa3000] text-white'
                : 'text-[#1b1b1c] hover:bg-[#eae7e7]'
            }`}
          >
            <span className="material-symbols-outlined text-lg mr-3">inventory_2</span>
            My Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center px-4 py-3 font-label-bold text-xs uppercase transition-all text-left ${
              activeTab === 'addresses'
                ? 'bg-[#1b1b1c] text-white'
                : 'text-[#1b1b1c] hover:bg-[#eae7e7]'
            }`}
          >
            <span className="material-symbols-outlined text-lg mr-3">location_on</span>
            Addresses
          </button>
        </aside>

        {/* Content Panel */}
        <div className="md:col-span-9 flex flex-col gap-8">
          
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-8">
              <h2 className="font-headline text-2xl text-[#1b1b1c] uppercase">
                ORDER HISTORY & TRACKING
              </h2>

              {loading ? (
                <div className="text-center py-16 font-label-bold text-[#5c4037]">
                  LOADING ORDERS DATA...
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord._id} className="bg-white brutalist-border p-6 flex flex-col gap-6">
                    
                    {/* Header bar */}
                    <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#1b1b1c] pb-4">
                      <div>
                        <span className="font-label-bold text-[10px] text-[#5c4037] block">ORDER ID</span>
                        <span className="font-headline text-xl text-[#aa3000]">#{ord._id}</span>
                      </div>

                      <div>
                        <span className="font-label-bold text-[10px] text-[#5c4037] block">DATE PLACED</span>
                        <span className="font-body text-sm font-bold text-[#1b1b1c]">
                          {new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      <div>
                        <span className="font-label-bold text-[10px] text-[#5c4037] block">TOTAL</span>
                        <span className="font-price-display text-xl text-[#1b1b1c]">
                          ${ord.totalPrice.toFixed(2)}
                        </span>
                      </div>

                      <div>
                        <span className="font-label-bold text-[10px] text-[#5c4037] block">STATUS</span>
                        <span className="inline-flex items-center gap-1 font-label-bold text-xs bg-[#aa3000]/10 text-[#aa3000] px-3 py-1 brutalist-border">
                          <span className="w-2 h-2 rounded-full bg-[#aa3000] animate-pulse" />
                          {ord.orderStatus || 'Confirmed'}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Visualizer */}
                    <div className="bg-[#f6f3f2] p-4 brutalist-border">
                      <div className="font-label-bold text-[11px] text-[#5c4037] mb-2 uppercase">
                        Shipment Status Tracker
                      </div>
                      <div className="w-full bg-[#eae7e7] h-2 relative overflow-hidden brutalist-border">
                        <div 
                          className="bg-[#aa3000] h-full transition-all duration-500" 
                          style={{ width: ord.orderStatus === 'Delivered' ? '100%' : '65%' }}
                        />
                      </div>
                      <div className="flex justify-between font-label-bold text-[10px] text-[#1b1b1c] mt-2 uppercase">
                        <span>Order Confirmed</span>
                        <span>Processing</span>
                        <span className="text-[#aa3000] font-bold">In Transit</span>
                        <span>Delivered</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-col gap-4">
                      {ord.orderItems?.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center bg-[#f6f3f2] p-3 brutalist-border">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-16 h-20 object-cover bg-[#eae7e7] brutalist-border"
                          />
                          <div className="flex-grow">
                            <h4 className="font-headline text-lg text-[#1b1b1c] uppercase">{item.title}</h4>
                            <p className="font-body text-xs text-[#5c4037]">
                              Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''} {item.selectedColor ? `• Color: ${item.selectedColor}` : ''}
                            </p>
                          </div>
                          <div className="font-price-display text-lg text-[#1b1b1c]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Address details */}
                    <div className="font-body text-xs text-[#5c4037] pt-2 border-t border-[#e6beb2]">
                      <span className="font-label-bold text-[#1b1b1c]">DELIVERY ADDRESS: </span>
                      {ord.shippingAddress?.fullName}, {ord.shippingAddress?.address}, {ord.shippingAddress?.city} {ord.shippingAddress?.postalCode}
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white brutalist-border p-8 flex flex-col gap-6">
              <h2 className="font-headline text-2xl text-[#1b1b1c] uppercase border-b border-[#1b1b1c] pb-4">
                USER PROFILE DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body">
                <div>
                  <label className="font-label-bold text-xs text-[#5c4037] uppercase block mb-1">Full Name</label>
                  <input type="text" readOnly value={user ? user.name : 'Alex Vance'} className="brutalist-input w-full font-bold" />
                </div>
                <div>
                  <label className="font-label-bold text-xs text-[#5c4037] uppercase block mb-1">Email</label>
                  <input type="email" readOnly value={user ? user.email : 'alex.vance@urbankinetic.com'} className="brutalist-input w-full" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white brutalist-border p-8 flex flex-col gap-6">
              <h2 className="font-headline text-2xl text-[#1b1b1c] uppercase border-b border-[#1b1b1c] pb-4">
                SAVED SHIPPING ADDRESSES
              </h2>
              <div className="bg-[#f6f3f2] p-4 brutalist-border font-body text-sm">
                <div className="font-bold text-[#aa3000] uppercase mb-1">Primary Residence</div>
                <p>742 Kinetic Blvd, Suite 400</p>
                <p>New York, NY 10001</p>
                <p className="mt-2 text-xs text-[#5c4037]">+1 (555) 019-2834</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
};

export default OrdersPage;
