import productModel from "../models/MongoDB/productModel.js";

export const getPagProducts = async (
  all,
  search,
  category,
  brand,
  sort,
  page,
  limit
) => {
  try {
    let products;
    let sortOption;
    let query = {};
    if (category) {
      query.category = category;
    }

    if(brand){
      query.brand =brand
    }

    if (search) {
      query.title = new RegExp(search, "i");
    }
    if (sort === 'asc') {
      sortOption = { price: 1 }; // Ascendente
    } else if (sort === 'desc') {
      sortOption = { price: -1 }; // Descendente
    }

    products = await productModel.paginate(query, {
      limit: limit,
      page: page,
      sort: sortOption,
    });
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    return await productModel.findById(id);
  } catch (error) {
    return error;
  }
};

export const productAdd = async (product) => {
  try {
    const addProd = await productModel.insertMany([product]);
    if (addProd) {
      console.log(await addProd);
      return addProd;
    } else {
      throw new Error("Error al gergar producto/s");
    }
  } catch (error) {
    throw error;
  }
};

export const productDelete = async (id) => {
  try {
    const deleteProd = await productModel.findByIdAndDelete(id);
    return deleteProd;
  } catch (error) {
    throw error;
  }
};

export const productUpdate = async (id, info) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, info, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const products = await productModel.find();
    return products;
  } catch (error) {
    throw error;
  }
};
