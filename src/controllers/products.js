import Products from "../models/products.js";

const getAll = async (req, res, next) => {
  const products = await Products.query({ type: Products.types.GET_ALL });
  if (products.length > 0) {
    // console.log(products);
    res.json(products);
  } else {
    res.status(404).json({ message: "No products found" });
  }
  next();
};

const find = async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.query({
    type: Products.types.FIND,
    data: { id },
  });
  if (product.length > 0) {
    res.json(product[0]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
  next();
};

const create = async (req, res, next) => {
  const { id, name, quantity } = req.body;
  const product = await Products.query({
    type: Products.types.CREATE,
    data: { id, name, quantity },
  });
  if (!product.error && product.affectedRows > 0) {
    res.json({ message: "Product created successfully" });
  } else {
    res
      .status(500)
      .json({ message: `Error creating product - ${product.error.message}` });
  }
  next();
};

const update = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const product = await Products.query({
    type: Products.types.UPDATE,
    data: { id, name, quantity },
  });
  if (!product.error && product.affectedRows > 0) {
    res.json({ message: "Product updated successfully" });
  } else {
    res
      .status(500)
      .json({ message: `Error updating product - ${product.error.message}` });
  }
  next();
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.query({
    type: Products.types.DELETE,
    data: { id },
  });
  if (!product.error && product.affectedRows > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json({ message: `Error deleting product - ${product.error.message}` });
  }
  next();
};

export { getAll, find, create, update, deleteProduct };
