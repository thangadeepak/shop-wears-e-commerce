import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import styles from './Hero.module.css';

const slides = [
  {
    eyebrow: 'LITTLE OUTFITS. BIG MEMORIES.',
    title: <>Big smiles<br />start with <em>little</em><br />outfits.</>,
    description: 'Everyday comfort and occasion-ready looks for boys aged 1–14. Picked with care for your little one.',
    primary: 'Shop new arrivals', primaryTo: '/shop', secondary: 'Explore festive wear', secondaryTo: '/shop?category=Kurta%20Sets',
    tagTop: 'THE NEW SEASON', tag: 'Little looks,\nbig adventures', image: 'https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_75%2Cw_1080/v1/assets/images/2025/JUNE/15/1La8hMeA_fdeaf1da1454493fb0c404274b2e2b10.jpg', alt: 'Indian boy in an embroidered kurta set', note: 'Made for play.', noteSub: 'Ready for every little adventure.',
  },
  {
    eyebrow: 'A LITTLE EXTRA MAGIC',
    title: <>Tiny traditions.<br /><em>Big</em> celebrations.</>,
    description: 'From first Pongal photos to festive family dinners, find the outfit that makes the moment.',
    primary: 'Shop kurta sets', primaryTo: '/shop?category=Kurta%20Sets', secondary: 'See festive edits', secondaryTo: '/shop?category=Ethnic%20%2F%20Festive',
    tagTop: 'FESTIVE EDIT', tag: 'Moments made\nto remember', image: 'https://chilipili.sg/cdn/shop/files/red_block_print_kurta_1_hero_cff6d6f9-4e61-4276-9001-cf128297580c.png?v=1772109828', alt: 'Boy wearing a block-print kurta for a celebration', note: 'Little traditions.', noteSub: 'Comfort for the whole celebration.',
  },
  {
    eyebrow: 'READY, SET, PLAY!',
    title: <>More room<br />for <em>little</em><br />adventures.</>,
    description: 'Soft cotton, comfy fits, and playful everyday favourites made to keep up with busy boys.',
    primary: 'Shop playtime picks', primaryTo: '/shop?category=Casual%20Wear', secondary: 'Find his next tee', secondaryTo: '/shop?category=T-Shirts%20%26%20Shorts',
    tagTop: 'EVERYDAY FAVOURITES', tag: 'Comfy fits for\nbig little days', image: 'https://ramrajcotton.in/cdn/shop/files/04_7edb86b5-0616-4eab-acf5-ef77d54e5ff1.jpg?v=1684496383', alt: 'Boy in a comfortable cotton kurta', note: 'All-day comfort.', noteSub: 'Soft cotton. Zero slowing down.',
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const move = useCallback((direction) => setActive(current => (current + direction + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = window.setInterval(() => move(1), 6000);
    return () => window.clearInterval(timer);
  }, [move, active]);

  const slide = slides[active];
  return <section className={styles.section} aria-roledescription="carousel" aria-label="Little Namma featured collections">
    <div className={styles.content}>
      <div className={styles.copy} key={`copy-${active}`}>
        <span className={styles.eyebrow}><Sparkles size={15} /> {slide.eyebrow}</span>
        <h1>{slide.title}</h1>
        <p>{slide.description}</p>
        <div className={styles.ctas}><Link to={slide.primaryTo} className={styles.primary}>{slide.primary}<ArrowRight size={17} /></Link><Link to={slide.secondaryTo} className={styles.secondary}>{slide.secondary}</Link></div>
        <div className={styles.note}><span>✦</span> Soft fabrics · Happy little moments</div>
      </div>

      <div className={styles.stage} key={`stage-${active}`}>
        <div className={styles.visual}>
          <img src={slide.image} alt={slide.alt} />
          <div className={styles.imageNote}><b>{slide.note}</b><span>{slide.noteSub}</span></div>
          <div className={styles.saleTag}><small>{slide.tagTop}</small><strong>{slide.tag.split('\n').map((line,index)=><React.Fragment key={line}>{index>0&&<br/>}{line}</React.Fragment>)}</strong></div>
          <span className={styles.photoIndex}>0{active+1}<i> / 0{slides.length}</i></span>
        </div>
        <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={() => move(-1)} aria-label="Previous featured collection"><ArrowLeft size={18}/></button>
        <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => move(1)} aria-label="Next featured collection"><ArrowRight size={18}/></button>
      </div>
    </div>

    <div className={styles.carouselBar}>
      <span className={styles.slideCount}>0{active+1}<i> / 0{slides.length}</i></span>
      <div className={styles.progressTrack} aria-hidden="true"><span key={active}/></div>
      <div className={styles.dots} role="tablist" aria-label="Choose featured collection">{slides.map((item,index)=><button key={item.eyebrow} role="tab" aria-selected={index===active} aria-label={`Show slide ${index+1}: ${item.tagTop}`} onClick={()=>setActive(index)} className={index===active?styles.dotActive:styles.dot}/>)}</div>
    </div>
  </section>;
}
