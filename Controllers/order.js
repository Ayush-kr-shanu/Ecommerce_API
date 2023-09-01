const { Cart } = require("../Models/Cart.model");
const { Order } = require("../Models/Order.model");
const { Product } = require("../Models/Product.models");

const orderController = {
  // Place an order using the items in the user's cart
  async placeOrder(req, res) {
    try {
      const { cartId } = req.body; // Get cartId from the request body
      const userId = req.user.id;
  
      if (!cartId) {
        return res.status(401).json({ msg: "Cart ID is mandatory" });
      }
  
      // Check if the cart belongs to the user
      const cart = await Cart.findOne({
        where: { id: cartId, userId: userId },
      });
  
      if (!cart) {
        return res.status(401).json({ msg: "Cart not found for the user" });
      }
  
      // Create a new order and associate it with the cart
      const order = await Order.create({
        userId,
        cartId, // Set the cartId for the order
      });
  
      return res.status(201).json({ msg: "Order placed", order });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to place order", err: error.message });
    }
  },

  // Fetch order history for the authenticated user
  async getOrderHistory(req, res) {
    try {
      const userId = req.user.id; // Assuming user ID is available in the request

      // Find orders for the user
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: Cart,
            include: [{ model: Product }],
          },
        ],
      });

      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({
        error: "Failed to retrieve order history",
        err: error.message,
      });
    }
  },

  // Fetch detailed information of a specific order by its ID
  async getOrderDetails(req, res) {
    try {
      const { orderId } = req.params;

      // Find the order by its ID
      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: Cart,
            include: [{ model: Product }],
          },
        ],
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.status(200).json(order);
    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Failed to retrieve order details",
          err: error.message,
        });
    }
  },
};

module.exports = orderController;
