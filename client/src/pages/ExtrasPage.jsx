import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Ruler, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { sampleProducts } from '../data/sampleProducts';
import styles from './ExtrasPage.module.css';

const pageContent={
  about:{eyebrow:'OUR LITTLE STORY',title:'Made for the little things that matter.',body:'Little Namma is a joyful boyswear store for growing up, showing up, and getting wonderfully messy. We pick soft, easy-to-wear outfits for boys aged 1–14, with thoughtful details parents can count on.',icon:Heart},
  contact:{eyebrow:'WE’RE HERE TO HELP',title:'Let’s make shopping easy.',body:'Need a hand with sizing, delivery or an order? Our parent-friendly support team is happy to help Monday to Saturday, 9:00 AM–6:00 PM IST.',icon:MessageCircle},
  faq:{eyebrow:'GOOD TO KNOW',title:'Frequently asked questions',body:'Find quick answers about sizing, delivery, payment and returns.',icon:ShieldCheck},
  shipping:{eyebrow:'DELIVERY & RETURNS',title:'Easy from checkout to doorstep.',body:'We offer free shipping on orders above ₹499. Most orders reach you within 3–7 business days. If a style is not quite right, request a return or exchange within 7 days of delivery, subject to product eligibility.',icon:Truck},
  'size-guide':{eyebrow:'A COMFY FIT, EVERY TIME',title:'Boys size guide',body:'Age is a helpful starting point. For the best fit, measure your child’s height and chest and compare with the guide below. If between sizes, choose the larger size for a little growing room.',icon:Ruler},
  privacy:{eyebrow:'YOUR DETAILS, RESPECTED',title:'Privacy policy',body:'We use the details you share to manage your account, fulfil orders and help with support requests. We do not sell your personal information. You can contact us to review or update your account details.',icon:ShieldCheck},
  terms:{eyebrow:'THE IMPORTANT BITS',title:'Terms of service',body:'Prices are shown in Indian rupees and include applicable taxes. Product availability, delivery eligibility and return rules are confirmed at checkout. Mock storefront content is provided for this shopping experience.',icon:ShieldCheck},
};

export function WishlistPage(){const {wishlistItems}=useCart();return <main className={styles.page}><span className={styles.eyebrow}>SAVED FOR LATER</span><h1>Your wishlist</h1><p>Little favourites, all in one place.</p>{wishlistItems.length?<div className={styles.products}>{wishlistItems.map(p=><ProductCard key={p._id||p.slug} product={p}/>)}</div>:<div className={styles.faq}><p>Your wishlist is waiting for something lovely. Tap the heart on an outfit to save it here.</p><Link className={styles.cta} to="/shop">Explore boyswear</Link></div>}</main>;}

export default function ExtrasPage(){
  const slug=useLocation().pathname.split('/').filter(Boolean).pop()||'about';
  const page=pageContent[slug]||pageContent.about; const Icon=page.icon;
  return <main className={styles.page}><div className={styles.intro}><span className={styles.eyebrow}>{page.eyebrow}</span><Icon size={27}/><h1>{page.title}</h1><p>{page.body}</p>{slug==='contact'&&<a className={styles.cta} href="https://wa.me/919876543210"><MessageCircle size={17}/> Chat with us on WhatsApp</a>}</div>
    {slug==='size-guide'?<div className={styles.tableWrap}><table><thead><tr><th>Age</th><th>Height (cm)</th><th>Chest (cm)</th></tr></thead><tbody>{[['0-2Y','80-92','50-54'],['2-4Y','92-104','54-58'],['4-6Y','104-116','58-62'],['6-8Y','116-128','62-66'],['8-10Y','128-140','66-72'],['10-14Y','140-164','72-82']].map(row=><tr key={row[0]}>{row.map(value=><td key={value}>{value}</td>)}</tr>)}</tbody></table></div>:slug==='faq'?<div className={styles.faq}>{[['How do I choose the right size?','Use the age guide as a starting point and compare your child’s height and chest in our size guide.'],['When will my order arrive?','Most orders are delivered within 3–7 business days. We’ll share updates as your order moves.'],['Can I pay cash on delivery?','Yes, COD is available for eligible delivery pincodes.'],['How do returns work?','Request an eligible return or exchange within 7 days of delivery. Keep the product unused with its tags.']].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>:slug==='shipping'?<div className={styles.policyGrid}><article><Truck/><h3>Delivery</h3><p>Free shipping above ₹499. Delivery estimates are shown after your pincode is entered.</p></article><article><RotateCcw/><h3>Easy returns</h3><p>Eligible pieces can be returned or exchanged within 7 days after delivery.</p></article></div>:null}
    {slug==='about'&&<div className={styles.policyGrid}><article><Heart/><h3>Soft by nature</h3><p>Comfy fabrics and fuss-free fits, selected for busy little days.</p></article><article><ShieldCheck/><h3>Parent-approved</h3><p>Clear prices, convenient payments and support when you need it.</p></article></div>}
    <Link className={styles.shopLink} to="/shop">Explore boyswear <span>→</span></Link>
  </main>;
}
