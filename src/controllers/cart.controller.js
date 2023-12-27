import {
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  getProductsFromCart,
  updateProductFromCart,
  createCart,
  getAllCarts,
} from "../services/cartService.js";
import { getProductById, productUpdate } from "../services/productService.js";
import { generateTicket } from "../services/ticketService.js";

export const cartCreate = async (req, res) => {
  try {
    const newCart = await createCart();
    if (!newCart) {
      return res
        .status(400)
        .send({ status: "error", error: "Error al crear carrito" });
    }
    res.status(200).send({ status: "success", payload: newCart });
  } catch (error) {
    res.status(400).send({ status: "error", error: error });
  }
};

export const getCarts = async (req, res) => {
  try {
    const carts = await getAllCarts();
    if (!carts) {
      return res
        .status(400)
        .send({ status: "error", error: "Error al obtener los carritos" });
    }
    res.status(200).send({ status: "success", payload: carts });
  } catch (error) {
    res.status(400).send({ status: "error", message: error });
  }
};

export const getProductsCart = async (req, res) => {
  try {
    const productsCart = await getProductsFromCart(req.user.idCart);
    /*const listProducts = await cart.products;
    const products = [];
    listProducts.map((prod) => {
      let newProduct = { ...prod.productId._doc };
      newProduct.quantity = prod.quantity;
      newProduct.cartId = req.params.cid;
      products.push(newProduct);
    });*/
    res.status(200).send( {  status: "success", payload: productsCart });
  } catch (error) {
    res
        .status(400)
        .send({
          status: "error",
          error: error,
        });
  }
};

export const AddProductCart = async (req, res) => {
  const quantity=parseInt(req.query.quantity) || 1
  console.log(quantity)
  try {
    const addProduct = await addProductToCart(req.user.idCart, req.params.pid, quantity);
    if (!addProduct)
      return res
        .status(400)
        .send({
          status: "error",
          error: "Error al añadir producto al carrito",
        });
    res.status(200).send({ status: "success", payload: addProduct });
  } catch (error) {
    res
        .status(400)
        .send({
          status: "error",
          error: error,
        });
  }
};

export const deleteProductCart = async (req, res) => {
  try {
    const deleteProductOfCart = await deleteProductFromCart(
      req.user.idCart,
      req.params.pid
    );
    if(await deleteProductOfCart){
      res.status(200).send({ status: "success", payload: deleteProductOfCart });
    }else{
      res.status(400).send({ status: "error", message: "Error al eliminar producto del carrito" });
    }
  } catch (error) {
    res.status(400).send({ status: "error", error: "Error al eliminar el producto" });
  }
  
};

export const deleteAllProductsCart = async (req, res) => {
  try {
    const deleteAllProducts = await deleteAllProductsFromCart(req.user.idCart);
  if (!deleteAllProducts)
    return res
      .status(400)
      .send({ status: "error", error: "Error al añadir producto al carrito" });
  res.status(200).send({ status: "success", payload: deleteAllProducts });
  } catch (error) {
    res
      .status(400)
      .send({ status: "error", error: error});
  }
  
};

export const updateProductCart = async (req, res) => {
  try {
    const updateProduct = await updateProductFromCart(
      req.user.idCart,
      req.params.pid,
      req.body
    );
    if (updateProduct)
      res.status(200).send({ status: "success", payload: updateProduct });
    else {
      res
        .status(400)
        .send({ status: "error", message: "Error al modificar la cantidad" });
    }
  } catch (error) {
    res
        .status(400)
        .send({ status: "error", error: error });
  }
  
};

export const purchaseCart = async (req, res) => {
  try {
    const cartID = req.user.idCart;
    const cart = await getProductsFromCart(req.user.idCart);
    const products = cart.products;
    let ticketData;
    if (products.length > 0) {
      let amount = 0;
      let idsProductNoStock = [];
      await Promise.all(
        products.map(async (prod) => {
          let product = await getProductById(prod.productId._id);
          if (prod.quantity <= product.stock) {
            await productUpdate(prod.productId._id, {
              stock: product.stock - prod.quantity,
            });
            amount += prod.productId.price * prod.quantity;
            await deleteProductFromCart(cartID, prod.productId._id);
          } else {
            idsProductNoStock.push(prod.productId);
          }
        })
      );
      if (amount > 0) {
        ticketData = await generateTicket(amount, req.user.email);
        if (ticketData) {
          res.status(200).send({ status: "success", payload: ticketData });
        }
      } else {
        res.status(400).send({
          status: "error",
          message: "No Hay ningun producto seleccionado en stock.",
        });
      }
    } else {
      res
        .status(400)
        .send({ status: "error", message: "No Hay productos En El Carrito" });
    }
  } catch (error) {
    res.status(400).send({ status: "error", message: error });
  }
};
