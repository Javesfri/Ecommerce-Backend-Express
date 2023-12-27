import mongoose, { Schema, model } from "mongoose";
let userModel;

if (mongoose.models["users"]) {
  userModel = mongoose.models("users");
} else {
  const userSchema = new Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    rol: {
      type: String,
      default: "User"
      ,
    },
    password: {
      type: String,
      required: true,
    },
    idCart: {
      type: Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },
    documents: [{
      name: String,
      reference: String
    }],
    last_connection: Date,
  });

  userModel = mongoose.model("users", userSchema);
}

export default userModel;
