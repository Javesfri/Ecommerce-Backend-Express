import mongoose, { Schema, model } from "mongoose";
let cartModel;

if (mongoose.models["carts"]) {
  cartModel = mongoose.models("carts");
} else {
  const cartSchema = new Schema({
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  });

  cartModel = mongoose.model("carts", cartSchema);
}

export default cartModel;
