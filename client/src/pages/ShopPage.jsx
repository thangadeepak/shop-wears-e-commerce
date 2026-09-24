import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/sampleProducts';
import styles from './ShopPage.module.css';

const ages=['0-2Y','2-4Y','4-6Y','6-8Y','8-10Y','10-14Y'];
const categories=['Kurta Sets','Party Wear','Casual Wear','School Wear','Ethnic / Festive','Nightwear','T-Shirts & Shorts','Winter Wear'];
const fabrics=['Cotton','100% Cotton','Cotton Blend','Cotton Silk','Soft Cotton','Organic Cotton','Fleece Cotton'];

export default function ShopPage() {
  const location=useLocation();
  const query=new URLSearchParams(location.search);
  const [category,setCategory]=useState(query.get('category')||'');
  const [search,setSearch]=useState(query.get('search')||'');
  const [age,setAge]=useState(query.get('age')||'');
  const [maxPrice,setMaxPrice]=useState(Number(query.get('maxPrice'))||2500);
  const [fabric,setFabric]=useState('');
  const [minRating,setMinRating]=useState(0);
  const [sort,setSort]=useState('Popularity');
  const [drawer,setDrawer]=useState(false);
  const [page,setPage]=useState(1);
  useEffect(()=>{setCategory(query.get('category')||'');setSearch(query.get('search')||'');setAge(query.get('age')||'');setMaxPrice(Number(query.get('maxPrice'))||2500);setPage(1);},[location.search]);
  const filtered=useMemo(()=>sampleProducts.filter(p=>(!category||p.category===category)&&(!search||`${p.title} ${p.description} ${p.category}`.toLowerCase().includes(search.toLowerCase()))&&(!age||p.age===age)&&(p.discountPrice||p.price)<=maxPrice&&(!fabric||p.fabric.toLowerCase().includes(fabric.toLowerCase()))&&p.rating>=minRating).sort((a,b)=>sort==='Price: Low to High'?a.discountPrice-b.discountPrice:sort==='Price: High to Low'?b.discountPrice-a.discountPrice:sort==='Newest'?b.numReviews-a.numReviews:b.rating-a.rating),[category,search,age,maxPrice,fabric,minRating,sort]);
  const pageCount=Math.max(1,Math.ceil(filtered.length/12));
  const clear=()=>{setCategory('');setAge('');setMaxPrice(2500);setFabric('');setMinRating(0);setSearch('');setPage(1);};
  return <main className={styles.page}>
    <nav className={styles.breadcrumb}><Link to="/">Home</Link><span>/</span><span>{category||'Boys clothing'}</span></nav>
    <div className={styles.header}><div><span>MADE FOR BOYS AGED 1–14 YEARS</span><h1>{category||'All boys clothing'}</h1><p>{filtered.length} lovely little styles to explore</p></div><div className={styles.controls}><button className={styles.filterToggle} onClick={()=>setDrawer(true)}><SlidersHorizontal size={16}/> Filters</button><label>Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option>Popularity</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest</option></select><ChevronDown size={15}/></label></div></div>
    <div className={styles.layout}><aside className={`${styles.sidebar} ${drawer?styles.sidebarOpen:''}`}><div className={styles.sidebarHead}><b>Filters</b><button onClick={()=>setDrawer(false)} aria-label="Close filters"><X/></button></div><div className={styles.filterSection}><h3>Age / Size</h3>{ages.map(v=><label key={v}><input type="radio" name="age" checked={age===v} onChange={()=>{setAge(age===v?'':v);setPage(1);}}/>{v}</label>)}</div><div className={styles.filterSection}><h3>Occasion</h3>{categories.map(v=><label key={v}><input type="radio" name="category" checked={category===v} onChange={()=>{setCategory(category===v?'':v);setPage(1);}}/>{v}</label>)}</div><div className={styles.filterSection}><h3>Price range</h3><p>Up to ₹{maxPrice.toLocaleString('en-IN')}</p><input type="range" min="299" max="2499" step="100" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/><div className={styles.rangeLabels}><span>₹299</span><span>₹2,499</span></div></div><div className={styles.filterSection}><h3>Fabric</h3>{fabrics.slice(0,5).map(v=><label key={v}><input type="radio" name="fabric" checked={fabric===v} onChange={()=>setFabric(fabric===v?'':v)}/>{v}</label>)}</div><div className={styles.filterSection}><h3>Colour</h3><div className={styles.swatches}>{[['#6D28D9','Purple'],['#A78BFA','Lavender'],['#4C1D95','Plum'],['#ffffff','White'],['#d8d3de','Grey']].map(([color,label])=><button key={label} title={label} style={{background:color}} onClick={e=>{document.querySelectorAll(`.${styles.swatches} button`).forEach(b=>b.classList.remove(styles.swatchActive));e.currentTarget.classList.add(styles.swatchActive);}}/>)}</div></div><div className={styles.filterSection}><h3>Customer rating</h3>{[4,3,2].map(v=><label key={v}><input type="radio" name="rating" checked={minRating===v} onChange={()=>setMinRating(v)}/>{v}+ stars</label>)}</div><button className={styles.clear} onClick={clear}>Clear all filters</button><button className={styles.apply} onClick={()=>setDrawer(false)}>Show {filtered.length} styles</button></aside>{drawer&&<button className={styles.scrim} onClick={()=>setDrawer(false)} aria-label="Close filter drawer"/>}<section className={styles.results}>{search&&<p className={styles.searchInfo}>Search results for “{search}”</p>}{filtered.length===0?<div className={styles.empty}><h2>No styles found just yet</h2><p>Try a different age, occasion or price range.</p><button onClick={clear}>Clear filters</button></div>:<><div className={styles.grid}>{filtered.slice((page-1)*12,page*12).map(product=><ProductCard key={product._id} product={product}/>)}</div>{pageCount>1&&<div className={styles.pagination}><button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button><span>Page {page} of {pageCount}</span><button disabled={page===pageCount} onClick={()=>setPage(page+1)}>Next</button></div>}</>}</section></div>
  </main>;
}
