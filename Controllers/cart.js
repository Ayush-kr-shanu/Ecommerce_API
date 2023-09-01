const { Cart } = require("../Models/Cart.model"); 
const { Product } = require("../Models/Product.models")

const cartController = {
  // Add a product to the cart
  async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id; 

      if(!productId || !quantity){
        return res.status(401).json({ msg: "All details are mandatory" })
      }

      // Check if the product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if the product is already in the user's cart
      let cartItem = await Cart.findOne({
        where: { userId, productId },
      });

      if (cartItem) {
        // If the product is already in the cart, update the quantity
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        // If the product is not in the cart, create a new cart item
        cartItem = await Cart.create({
          productId,
          userId,
          quantity,
        });
      }

      return res.status(201).json({msg:"Added to cart sucesfully", cartItem});
    } catch (error) {
      return res.status(500).json({ error: "Failed to add to cart", err: error.message });
    }
  },

  // View the user's cart
  async viewCart(req, res) {
    try {
      const userId = req.user.id; 

      const cartItems = await Cart.findAll({
        where: { userId },
        include: [
            { model: Product }
        ],
      });

      return res.status(200).json(cartItems);
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve cart", err: error.message });
    }
  },

  // Update the quantity of a product in the cart
  async updateCartItem(req, res) {
    try {
      const { cartItemId } = req.params;
      const { quantity }= req.body

      if(!quantity){
        return res.status(401).json({ msg: "All details are mandatory" })
      }

      // Find the cart item by ID
      const cartItem = await Cart.findByPk(cartItemId);

      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      // Update the quantity
      cartItem.quantity = quantity;
      await cartItem.save();

      return res.status(200).json(cartItem);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update cart item", err: error.message });
    }
  },

  // Remove a product from the cart
  async removeCartItem(req, res) {
    try {
      const { cartItemId } = req.params;

      // Find the cart item by ID
      const cartItem = await Cart.findByPk(cartItemId);

      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      // Remove the cart item
      await cartItem.destroy();

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: "Failed to remove cart item", err: error.message });
    }
  },
};

module.exports = cartController;
