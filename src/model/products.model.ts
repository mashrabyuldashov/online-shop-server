import mongoose, { Schema, Types } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Types.Decimal128,
    required: true,
  },
  imgs: {
    type: [{ url: String }],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categorieID: {
    type: Types.ObjectId,
    ref: "categories",
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
