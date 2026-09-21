import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number, default: 0 },
    category: { type: String, required: true },
    brand: { type: String, default: 'Generic' },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 4.5 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
