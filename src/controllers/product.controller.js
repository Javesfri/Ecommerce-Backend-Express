import {
  getPagProducts,
  productAdd,
  productDelete,
  productUpdate,
  getAllProducts,
  getProductById,
} from "../services/productService.js";

export const getProductsPag = async (req, res) => {
  try {
    console.log(req.query)
    const category = req.query.category;
    const brand= req.query.brand;
    const sort = req.query.sort;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search=req.query.search
    const all=req.query.all==="true";
    const data = await getPagProducts(all, search,category,brand, sort, page, limit);
    if (data) {

      res.status(200).send({ status: "success", payload: { data } });
    }
    else{
      res.status(400).send({ status: "error", message: "Error al obtener productos" });
    }
  } catch (error) {
    res.status(400).send({ status: "error", error: error });
  }
};

export const productGetById = async (req, res) => {
  try {
    const product = await getProductById(req.params.pid);
    if(product)
    res.status(200).send({status:"success",payload:product});
    else{
      res.status(400).send({status:"error",message:"Error al obtener el producto"});
    }
  } catch (error) {
    res.status(400).send({status:"error",error:error});
  }
  
};

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = await productAdd(req.body);
    console.log(await newProduct)
  if (!newProduct) {
    return res
      .status(400)
      .send({ status: "error", error: "Error en la carga del producto" });
  }
  res.status(200).send({ status: "success", payload: newProduct });
    
  } catch (error) {
    res
      .status(400)
      .send({ status: "error", error: error });
  }
  
};

export const deleteProduct = async (req, res) => {
  try {
    const delProduct = await productDelete(req.params.id);
    if (!delProduct)
      return res
        .status(400)
        .send({ status: "error", error: "Error al eliminar el producto" });
    res.send({ status: "success", payload: delProduct });
  } catch (error) {
    res
        .status(400)
        .send({ status: "error", error: error });
  }
 
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productUpdate(req.params.id, req.body);
  if (!product) {
    return res
      .status(400)
      .send({ status: "error", error: "Error al actualizar el producto" });
  }
  res.status(200).send({ status: "success", payload: { product } });
  } catch (error) {
    res
      .status(400)
      .send({ status: "error", error: error});
  }
  
};

export const getProducts = async (req,res) => {
  try {
   const getProducts= await getAllProducts();
   if(!getProducts){
    return res
      .status(400)
      .send({ status: "error", error: "Error al obtener los productos" });
   }
   res.status(200).send({ status: "success", payload: { getProducts } });
  } catch (error) {
    res
      .status(400)
      .send({ status: "error", error: error });
  }
};

export const getProductsOffers = async (req,res)=>{
  try{
    const getProducts=await getAllProducts()
    if(!getProducts){
      return res
      .status(400)
      .send({ status: "error", error: "Error al obtener los productos" });
    }
    const offerProducts=getProducts.filter((product)=> product.offer ==true)
    res.status(200).send({status:"success",payload:offerProducts})
  }catch(error){
    res
      .status(400)
      .send({ status: "error", error: error });
  }
}
