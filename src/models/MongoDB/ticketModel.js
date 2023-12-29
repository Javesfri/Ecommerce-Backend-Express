import mongoose, { Schema, model } from "mongoose";
import { nanoid } from "nanoid";
let ticketModel;

if (mongoose.models["tickets"]) {
  ticketModel = mongoose.models["tickets"];
} else {
  const ticketSchema = new mongoose.Schema({
    payment_id: {
      type: String,
      unique: true,
      required: true,
    },
    payment_type: { type: String, required: true },

    purchase_datetime: {
      type: Date,
      required: true,
      default: () => Date.now(),
    },
    preference_id: {
      type: String,
      unique: true,
      required: true,
      index:true,
    },
    amount: {
      type: Number,
      required: true,
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    tel_number: { type: String, required: true },
    products: [
      {
        id_product: { type: String, required: true },
        thumbnail: { type: String, required: true },
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true },
      },
    ],
  });
  ticketModel = mongoose.model("tickets", ticketSchema);
}

export default ticketModel;
