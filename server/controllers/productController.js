import Product from '../models/Product.js';

// Initial Mock Product Data for demo / seed
export const sampleProducts = [
  {
    title: 'Everyday Oversized T-Shirt',
    slug: 'urban-essential-oversized-tee',
    description: 'The core foundation of the Kinetic wardrobe. Heavyweight 240gsm cotton cut in our signature boxy, drop-shoulder silhouette. Built for structure, designed for movement.',
    price: 1299,
    discountPrice: 899,
    category: 'T-Shirts',
    brand: 'Nava Wear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWTkGrGBgtwd-CqdmRe5faxoEjpdmueq5f1jqK5k2x_3EiOJHUua9xVZWU5FdfbYtr6BwXzVT55opvHUVCWaOERAbuPdkIhMLtXpEgLIO69M8XBKkE_zKc2B7SWDy0eZcCOrHNFG_VDbTcgA7BRBA9PxzE3XQ2AxWDoiN3R19bHMt1ZnymJ2XNNFfSkmnD2p-GB1L7A0nOFA0A53LK-LmJ2HfhrE2wKTLBDJI95ODhDncmdGAZHhBB',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWTkGrGBgtwd-CqdmRe5faxoEjpdmueq5f1jqK5k2x_3EiOJHUua9xVZWU5FdfbYtr6BwXzVT55opvHUVCWaOERAbuPdkIhMLtXpEgLIO69M8XBKkE_zKc2B7SWDy0eZcCOrHNFG_VDbTcgA7BRBA9PxzE3XQ2AxWDoiN3R19bHMt1ZnymJ2XNNFfSkmnD2p-GB1L7A0nOFA0A53LK-LmJ2HfhrE2wKTLBDJI95ODhDncmdGAZHhBB',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuClmwuKIB-LAsciCtL9c2irImRtJyEd0UdfHQmXzYAN3hQowdvkFaoDZYDhw_RZgbw6FtWlVt2fe6PD9bDvvDSmCMkH6HTRiOjC72NL-UmQZdcBtIJKUVSWIEcFAAKqs0q1CUEuIRjY6smv-C_chT5l80-gJQhavRg5LUyTBvC6eA1Dx6Q6ZPL2HZ4Uemav81FADOQVDaqU-TD61IC8fww82PqUPF4c4gJEPj4kl0LWXLTlq-zLXmpA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOdk_rihAStxJmywoRDTKBBC5VxUwVFLznK-VajFForhYQi2QbLX9XVhkENMy1LHKJqMwsnfgzN9Eb3J3KdWXLUZjCAKB-vXXDgJ0SjD4GrxCllyq4g-Xgv9KEoYDsnT3yxWnGi8Tkuail_jjQZD2eyjgfOHMUl77VCGprUWtUnohRX9Rg12HscTzMbSIwLrQmsAB_HhfMB2q0sfT7SNu-zEjuOem8DBqrMqMjLoUx7Y6sxgPkFpMh',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNrI4CvF_iwbUVkWwcVuNqWMOfQNloIbEzQf0srnELYYds--QzxuqUMEx2hjxXqG9SVnl2ZtOxt2xKpS_ddbEHmxTEv4t2yVHnhkfvyScwpS94NGhD1l6qwXsAfOncgvvbSregFUFidh-O_rED6OmuM3z0A0sP-Yvk7U_5YPTuV0Cvm1gZPnSbZA-I_IiwQ225zwo4DYygJKS_-Fq4m9vmycmG-2K1_FPXYUG0Bnvq_knk-yrUb0nZ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAksWyDJ2erkIWAI6I3q0Shy3klw2TSlOALgVO0ptK8BE24t9nRhhXU4Iak-nRr6vPIp5X8mdgQhxgTI1SSHmGdXH2STFVTmaTh4nbBpVedZZR18yUP9-iWpTYu95HGty6FuJ6kfVOjsIqXqJPUedbmkEk5_pX-XDz4aUI1cuRplyDgM7WvCaY4a_ZDH7ntyZ2jBCPa87WW9G-PlhX_mffI_ziJlwxz6mxpABJZ5Z0hlBLrb4FUvJVJ'
    ],
    stock: 50,
    rating: 4.8,
    numReviews: 128,
    isFeatured: true,
    colors: ['Onyx Black', 'Concrete Grey', 'Kinetic Orange'],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['streetwear', 'oversized', 'cotton', 'tee']
  },
  {
    title: 'City Runner Sneakers',
    slug: 'kinetic-runner-v2',
    description: 'High-fashion urban technical sneaker featuring dynamic sole architecture and responsive cushioning for high-kinetic movement.',
    price: 4999,
    discountPrice: 3499,
    category: 'Sneakers',
    brand: 'Nava Wear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuVwQv18_y8s0txZbt7xYp_hTIGtvA7wuft50avS_zpBCfhYB1wgY3IwrMfuF2sKftps-LdOfiewCiUvWtV0qdfn9e2bHH5PgxFNH6U2FvEcGpKXooiRAnVf10zSKNXwOdIvduLJ0u5LMhlDXUSLSoFmuU_DdDhlnCX5Dg-zVpQf2cYGYc2GPMSAD2Wbj8vvAxLw_9IMlD1xOFjS4d-b_kNQqDVx0GJAWcNpo-i3mi5psCuqfYaiNT',
    stock: 18,
    rating: 4.9,
    numReviews: 94,
    isFeatured: true,
    colors: ['Off-White', 'Onyx Black'],
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU'],
    tags: ['footwear', 'sneakers', 'kinetic']
  },
  {
    title: 'Everyday Fleece Hoodie',
    slug: 'structural-hoodie',
    description: 'Heavyweight 450gsm fleece hoodie with brutalist geometric seam detailing, double-lined hood, and structured drop shoulder fit.',
    price: 2499,
    discountPrice: 1799,
    category: 'Hoodies',
    brand: 'Nava Wear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAEyKAZvhRgh2iXnMH3ngXmT4qSZafLeTAlArDvZMe96Rpt_D4f_GyhcCIsDAlkK9zm8hlxJEoXLS6v2uXh61mE--OaYemRegU002jxFmnC8_wUzystM1KgTfIE3Xi1G58Z6DOuvWO4LLpFvmDoJ9M2AR8WQ8j6JdOWXRGjv9aZQhq4q38j4RBRkKF7tPEH7VsjXWJ1jy9PrY3C4Vcdf6X57dch9NXmaptiA0bpE9ebylBoFpWyjf2',
    stock: 25,
    rating: 4.7,
    numReviews: 64,
    isFeatured: true,
    colors: ['Onyx Black', 'Concrete Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['hoodie', 'outerwear', 'fleece']
  },
  {
    title: 'Utility Cargo Trousers',
    slug: 'kinetic-modular-cargo-pants',
    description: 'Technical ripstop cotton cargo pants engineered with 8 tactical storage pockets and adjustable ankle cinches.',
    price: 2299,
    discountPrice: 1599,
    category: 'Trousers',
    brand: 'Nava Wear',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    stock: 30,
    rating: 4.6,
    numReviews: 48,
    isFeatured: false,
    colors: ['Onyx Black', 'Olive Drab'],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['cargo', 'pants', 'bottoms']
  },
  {
    title: 'Everyday Crossbody Bag',
    slug: 'tactical-utility-crossbody-bag',
    description: 'Cordura weather-resistant crossbody chest bag with modular webbing, heavy-duty buckle fasteners, and high-viz orange inner lining.',
    price: 1499,
    discountPrice: 999,
    category: 'Bags',
    brand: 'Nava Wear',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.8,
    numReviews: 76,
    isFeatured: true,
    colors: ['Onyx Black', 'Kinetic Orange'],
    sizes: ['One Size'],
    tags: ['bag', 'utility', 'accessories']
  },
  {
    title: 'Relaxed Fit Long Sleeve T-Shirt',
    slug: 'kinetic-oversized-longsleeve',
    description: 'Ribbed cuff 280gsm heavyweight cotton long-sleeve tee featuring screenprinted brutalist typography on the sleeves.',
    price: 1599,
    discountPrice: 1099,
    category: 'T-Shirts',
    brand: 'Nava Wear',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.7,
    numReviews: 53,
    isFeatured: true,
    colors: ['Concrete Grey', 'Onyx Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['longsleeve', 'tops', 'streetwear']
  }
];

// @desc    Get all products with search & filter
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category && req.query.category !== 'All' ? { category: req.query.category } : {};

    let products;
    try {
      products = await Product.find({ ...keyword, ...category });
      if (!products || products.length === 0) {
        // Fallback to sample data if database is empty
        products = sampleProducts.filter(p => {
          const matchKeyword = req.query.keyword ? p.title.toLowerCase().includes(req.query.keyword.toLowerCase()) : true;
          const matchCat = req.query.category && req.query.category !== 'All' ? p.category === req.query.category : true;
          return matchKeyword && matchCat;
        });
      }
    } catch (dbError) {
      // In case MongoDB server is offline, return sample data gracefully
      products = sampleProducts.filter(p => {
        const matchKeyword = req.query.keyword ? p.title.toLowerCase().includes(req.query.keyword.toLowerCase()) : true;
        const matchCat = req.query.category && req.query.category !== 'All' ? p.category === req.query.category : true;
        return matchKeyword && matchCat;
      });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    let product;
    try {
      product = await Product.findById(req.params.id);
    } catch (err) {
      product = sampleProducts.find(p => p.slug === req.params.id || p.title.toLowerCase().replace(/\s+/g, '-') === req.params.id);
    }

    if (!product) {
      product = sampleProducts.find(p => p.slug === req.params.id || p.title.toLowerCase().replace(/\s+/g, '-') === req.params.id);
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
