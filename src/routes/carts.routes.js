import { Router } from "express";

import {
  getCarts,
  getProductsCart,
  AddProductCart,
  deleteProductCart,
  deleteAllProductsCart,
  updateProductCart,
  purchaseCart
} from "../controllers/cart.controller.js";
import { authenticate,rolVerify } from "../middlewares/authentication.js";
const routerCart = Router();
//Obtener carritos
routerCart.get("/",authenticate, getCarts);

//Obtener productos del carrito
routerCart.get("/products",authenticate,rolVerify("User"), getProductsCart);

//Añadir producto al carrito
routerCart.post("/product/:pid",authenticate,rolVerify("User"), AddProductCart);

//Crear ticket de compra
routerCart.post("/",authenticate,rolVerify("User"),purchaseCart)

//Acutalizar quantity de producto
routerCart.put("/product/:pid",authenticate,rolVerify("User"), updateProductCart);

//Eliminar un producto del carrito
routerCart.delete("/product/:pid",authenticate,rolVerify("User"), deleteProductCart);

//Eliminar productos del carrito
routerCart.delete("/",authenticate,rolVerify("User"), deleteAllProductsCart);




export default routerCart;
