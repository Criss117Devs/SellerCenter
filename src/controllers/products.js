import Products from "../models/products.js";

const getAll = async (req, res, next) => {
  const products = await Products.getAll();
  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(404).json({ message: "No products found" });
  }
  next();
};

const create = async (req, res, next) => {
  const { id, name, quantity } = req.body;
  const product = await Products.create({ id, name, quantity: quantity });

  if (!product.error && product.affectedRows > 0) {
    res.json({ message: "Product created successfully" });
  } else {
    res
      .status(500)
      .json({ message: `Error creating product - ${product.error.message}` });
  }

  next();
};

export { getAll, create };
