import {
  productGetById,
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductsPag,
  getProductsOffers
} from "../controllers/product.controller.js";
import { Router } from "express";
import { authenticate, rolVerify} from "../middlewares/authentication.js";
const routerProduct = Router();

routerProduct.get("/", getProductsPag);

routerProduct.post("/",authenticate,rolVerify("Admin"),addProduct);

routerProduct.get("/offers", getProductsOffers)

routerProduct.get("/:pid", productGetById);

routerProduct.delete("/:id",authenticate,rolVerify("Admin"), deleteProduct);

routerProduct.put("/:id",authenticate,rolVerify("Admin"), updateProduct);

export default routerProduct;
