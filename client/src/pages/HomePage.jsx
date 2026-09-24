import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, RotateCcw, ShieldCheck, Shirt, Truck, Star, Instagram, Cloud, Sparkles, Sun, Flower2, ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/sampleProducts';
import styles from './HomePage.module.css';

const ages = ['0-2Y', '2-4Y', '4-6Y', '6-8Y', '8-10Y', '10-14Y'];
const ageIcons = [Cloud, Sparkles, Sun, Flower2, Star, ArrowUpRight];
const campaignImages = [
  'https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_75%2Cw_1080/v1/assets/images/2025/JUNE/15/1La8hMeA_fdeaf1da1454493fb0c404274b2e2b10.jpg',
  'https://chilipili.sg/cdn/shop/files/red_block_print_kurta_1_hero_cff6d6f9-4e61-4276-9001-cf128297580c.png?v=1772109828',
  'https://ramrajcotton.in/cdn/shop/files/04_7edb86b5-0616-4eab-acf5-ef77d54e5ff1.jpg?v=1684496383',
];
const occasions = [
  { title:'Pongal', subtitle:'Little festive classics', category:'Ethnic / Festive', image:campaignImages[2] },
  { title:'Diwali', subtitle:'Made for the family photos', category:'Party Wear', image:campaignImages[1] },
  { title:'Eid', subtitle:'Celebrate in comfort', category:'Kurta Sets', image:campaignImages[0] },
];
const trust = [
  [Shirt,'Soft, skin-friendly','cotton'], [ShieldCheck,'Secure payment','every time'], [RotateCcw,'Easy 7-day','returns'], [Truck,'COD available','across India'],
];

function SectionTitle({ kicker, title, to='/shop' }) { return <div className={styles.sectionTitle}><div><span>{kicker}</span><h2>{title}</h2></div><Link to={to}>View all <ArrowRight size={16}/></Link></div>; }

export default function HomePage() {
  const [seconds, setSeconds] = useState(6 * 3600 + 23 * 60 + 41);
  useEffect(() => { const timer = setInterval(() => setSeconds(value => value > 0 ? value - 1 : 6 * 3600 + 23 * 60 + 41), 1000); return () => clearInterval(timer); }, []);
  const clock = [Math.floor(seconds/3600), Math.floor((seconds%3600)/60), seconds%60].map(n=>String(n).padStart(2,'0'));
  return <div className={styles.home}>
    <Hero />
    <section className={styles.section}><SectionTitle kicker="THE RIGHT FIT, RIGHT NOW" title="Shop by age" to="/shop"/><div className={styles.ageGrid}>{ages.map((age,i)=>{const AgeIcon=ageIcons[i];return <Link key={age} to={`/shop?age=${encodeURIComponent(age)}`} className={styles.ageCard}><span className={styles.ageIcon}><AgeIcon size={19}/></span><b>{age}</b><small>{i===0?'Tiny tots':'Boys'}</small></Link>;})}</div></section>
    <section className={styles.section}><SectionTitle kicker="DRESSED FOR THE MOMENT" title="Little celebrations"/><div className={styles.occasionGrid}>{occasions.map((item,i)=><Link key={item.title} to={`/shop?category=${encodeURIComponent(item.category)}`} className={styles.occasionCard}><img src={item.image} alt={`${item.title} outfits for boys`} /><div><span>FESTIVE EDIT 0{i+1}</span><h3>{item.title}</h3><p>{item.subtitle}</p><b>Explore edit <ArrowRight size={15}/></b></div></Link>)}</div></section>
    <section className={styles.section}><SectionTitle kicker="THE LITTLE NAMMA FAVOURITES" title="Best sellers"/><div className={styles.productGrid}>{sampleProducts.slice(0,4).map(product=><ProductCard key={product._id} product={product}/>)}</div></section>
    <section className={styles.deal}><div><span>DEALS OF THE DAY</span><h2>Big comfort.<br/>Little prices.</h2><p>Today’s favourites are going fast. Find a new outfit for less.</p><Link to="/shop">Shop today’s deals <ArrowRight size={16}/></Link></div><div className={styles.timer}><small>OFFER ENDS IN</small><strong>{clock[0]} : {clock[1]} : {clock[2]}</strong><span>HOURS　 MIN　 SEC</span></div><div className={styles.dealImage}><img src={campaignImages[2]} alt="Boy wearing a comfortable cotton kurta"/></div></section>
    <section className={styles.section}><SectionTitle kicker="FRESH FROM OUR LITTLE WARDROBE" title="New arrivals"/><div className={styles.productGrid}>{sampleProducts.slice(8,12).map(product=><ProductCard key={product._id} product={product}/>)}</div></section>
    <section className={styles.section}><SectionTitle kicker="GOOD STYLE, HAPPY BUDGET" title="Shop by price"/><div className={styles.priceGrid}>{[['Under ₹499','Little finds for less'],['Under ₹999','Everyday favourites'],['Under ₹1,499','A little something special']].map(([title,sub],i)=><Link key={title} to={`/shop?maxPrice=${[499,999,1499][i]}`} className={styles.priceCard}><span>PRICE EDIT 0{i+1}</span><b>{title}</b><small>{sub}</small><ArrowRight size={17}/></Link>)}</div></section>
    <section className={styles.trust}>{trust.map(([Icon,title,sub])=><div key={title} className={styles.trustItem}><Icon/><div><b>{title}</b><span>{sub}</span></div></div>)}</section>
    <section className={styles.section}><SectionTitle kicker="A LITTLE LOVE FROM OUR FAMILIES" title="Parents say it best"/><div className={styles.reviewGrid}>{[['“Soft, comfy and my son loved wearing his kurta all day.”','Ananya · Chennai'],['“The sizing guide was spot on. Easy ordering and lovely quality.”','Rahul · Bengaluru'],['“Finally, playful clothes that survive a whole day of adventures!”','Meera · Coimbatore']].map(([quote,by])=><article className={styles.reviewCard} key={by}><div className={styles.stars}><Star/><Star/><Star/><Star/><Star/></div><p>{quote}</p><b>{by}</b><small>Verified parent</small></article>)}</div></section>
    <section className={styles.section}><SectionTitle kicker="LITTLE LOOKS, BIG PERSONALITY" title="From our little world"/><div className={styles.socialGrid}>{[...campaignImages, campaignImages[0]].map((image,i)=><a key={`${image}-${i}`} href="https://instagram.com" aria-label="Visit Little Namma on Instagram"><img src={image} alt="Little Namma boys fashion inspiration"/><span><Instagram size={18}/></span></a>)}</div></section>
    <section className={styles.newsletter}><div><BadgeCheck/><span>THE LITTLE NAMMA LETTER</span><h2>Lovely little updates,<br/>straight to your inbox.</h2><p>New arrivals, thoughtful tips and offers made for parents.</p></div><form onSubmit={event=>event.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required/><button type="submit">Sign me up <ArrowRight size={16}/></button><small>Just the good stuff. Unsubscribe any time.</small></form></section>
  </div>;
}
