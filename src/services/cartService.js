import cartModel from "../models/MongoDB/cartModel.js";
import { getProductById, productUpdate } from "./productService.js";


export const addProductToCart = async (idCart, idProduct,quantity) => {
  let product = await getProductById(idProduct);
  if ((await product) && (await product.stock) >= quantity) {
    try {
      const cart = await cartModel.findById(idCart);
      let index = await cart.products.findIndex(
        (element) => element.productId == idProduct
      );
      if (index != -1) {
        cart.products[index].quantity += quantity;
      } else {
        await cart.products.push({
          productId: idProduct,
          quantity: quantity,
        });
      }
      cart.save();
      console.log(`${product.title} agregado al carrito!`);
      return cart.populate("products.productId");
    } catch (error) {
      throw error;
    }
  }
};

export const deleteProductFromCart = async (idCart, id) => {
  try {
    if (getProductById(id)) {
      const cart = await cartModel.findById(idCart);
      const remove= await cart.products.remove({ productId: id });
      if(remove && remove.length !== 0){
        console.log(remove)
        await cart.save();
        return cart;
      }
      
      else{
        throw new Error("Error al eliminar el prdouctod del carrito, probable inexistencia")
      }
      
    }
  } catch (error) {
    throw error;
  }
};

export const deleteAllProductsFromCart = async (idCart) => {
  try {
    const cart = await cartModel.findById(idCart);
    cart.products = [];
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};

export const getProductsFromCart = async (idCart) => {
  try {
    const cart = await cartModel.findById(idCart);
    let cartTotal = await cart.populate("products.productId");
    return cartTotal;
  } catch (error) {
    throw error;
  }
};

export const updateProductFromCart = async (idCart, idProduct, quantity) => {
  try {
    const cart = await cartModel.findById(idCart);
    let index = await cart.products.findIndex(
      (element) => element.productId == idProduct
    );
    if (index != -1) {
      cart.products[index].quantity = parseInt(quantity.quantity);
      cart.save();
      return cart;
    }
    throw new Error("Producto no existente")
  } catch (error) {
    throw error;
  }
};
export const createCart = async () => {
  try {
    let cart = await cartModel.create({});
    return cart;
  } catch (error) {
    throw error;
  }
};

export const getAllCarts = async () => {
  try {
    return await cartModel.find();
  } catch (error) {
    throw error;
  }
};

export const getProductsToPurchase = async (idCart) => {
  try {
    const cartProducts = await getProductsFromCart(idCart);
    const products = cartProducts.products;
    if (products.length > 0) {
      return;
    } else {
      console.log("No hay Productos En el Carrito");
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (id) => {
  try {
    return await cartModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
