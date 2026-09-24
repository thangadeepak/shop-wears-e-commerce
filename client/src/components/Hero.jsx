import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return <section className={styles.section}>
    <div className={styles.content}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}><Sparkles size={15} /> LITTLE OUTFITS. BIG MEMORIES.</span>
        <h1>Big smiles<br />start with <em>little</em><br />outfits.</h1>
        <p>Everyday comfort and occasion-ready looks for boys aged 1–14. Thoughtfully picked for your little one.</p>
        <div className={styles.ctas}><Link to="/shop" className={styles.primary}>Shop new arrivals <ArrowRight size={17} /></Link><Link to="/shop?category=Kurta%20Sets" className={styles.secondary}>Explore festive wear</Link></div>
        <div className={styles.note}><span>✦</span> Soft fabrics · Happy little moments</div>
      </div>
      <div className={styles.visual}>
        <img src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1100&q=90" alt="Little boy dressed for a happy day out" />
        <div className={styles.imageNote}><b>Made for play.</b><span>Ready for every little adventure.</span></div>
        <div className={styles.saleTag}>New season<br /><strong>up to 40% off</strong></div>
      </div>
    </div>
    <div className={styles.dots}><i /><i /><i /><span>01 / 03</span></div>
  </section>;
}
